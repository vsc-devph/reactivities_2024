import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activity"
import agent from "../api/agent"
import { v4 as uuid } from 'uuid'
import { format } from "date-fns"


export default class ActivityStore {
    activityRegistry = new Map<string, Activity>()
    selectedActivity: Activity | undefined = undefined
    editMode = false
    loadingMode = false
    loadingInitial = false

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            a.date!.getTime() -b.date!.getTime())
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!,'dd MMM yyyy')
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]
                return activities
            }, {} as { [key: string]: Activity[] })
        )
    }

    loadActivities = async () => {
        this.setLoadingInitial(true)
        try {
            const activities = await agent.Activities.list()
            activities.forEach(activity => {
                this.setActivity(activity)
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }


    loadActivity = async (id: string) => {
        let activity = this.getActivity(id)
        if (activity) {
            this.selectedActivity = activity
            return activity
        }
        else {
            this.setLoadingInitial(true)

            try {
                activity = await agent.Activities.details(id) 
                this.setActivity(activity)
                runInAction(() => this.selectedActivity = activity)
                this.setLoadingInitial(false)
                return activity
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false)
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!)
        this.activityRegistry.set(activity.id, activity)
        return activity
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id)
    }


    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }


    setLoadingMode = (state: boolean) => {
        this.loadingMode = state
    }


    setEditMode = (state: boolean) => {
        this.editMode = state
    }


    createActivity = async (activity: Activity) => {
        this.loadingMode = true
        activity.id = uuid()
        try { 
            await agent.Activities.create(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                this.loadingMode = false
                this.editMode = false
            })
            // this.setLoadingMode(false)
            // this.setEditMode(false)
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingMode = false
            )


        }
    }


    updateActivity = async (activity: Activity) => {
        this.loadingMode = true
        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                this.editMode = false
                this.loadingMode = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingMode = false
            )

        }
    }

    deleteActivity = async (id: string) => {
        this.loadingMode = true
        try {
            await agent.Activities.delete(id)
            runInAction(() => {
                this.activityRegistry.delete(id)
                this.loadingMode = false
            })

        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loadingMode = false
            })
        }
    }
}