import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activity"
import agent from "../api/agent"
import { v4 as uuid } from 'uuid'
import { toJS } from 'mobx';


export default class ActivityStore {
    activityRegistry = new Map<string, Activity>()
    selectedActivity: Activity | undefined = undefined
    editMode = false
    loadingMode = false
    loadingInitial = true

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            (Date.parse(a.date) - Date.parse(b.date)))
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list()
            activities.forEach(activity => {
                activity.date = activity.date.split("T")[0]
                runInAction(() =>
                    this.activityRegistry.set(activity.id, activity)
                )
            })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false
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
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity()
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