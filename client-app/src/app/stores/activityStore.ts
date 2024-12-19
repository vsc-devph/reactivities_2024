import { makeAutoObservable, runInAction } from "mobx"
import { Activity, ActivityFormValues } from "../models/activity"
import agent from "../api/agent"
import { v4 as uuid } from 'uuid'
import { format } from "date-fns"
import { store } from "./store"
import { Profile } from "../models/profile"
import { tr } from "date-fns/locale"


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
            a.date!.getTime() - b.date!.getTime())
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy')
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
        const user = store.userStore.user
        if (user) {
            activity.isGoing = activity.attendees!.some(
                a => a.username === user.username
            )
            activity.isHost = activity.hostUsername === user.username
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername)
        }
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


    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user
        const attendee = new Profile(user!)
        // activity.id = uuid()
        try {
            await agent.Activities.create(activity)
            const newActivity = new Activity(activity)
            newActivity.hostUsername = user!.username
            newActivity.attendees = [attendee]
            this.setActivity(newActivity)
            runInAction(() => {
                this.selectedActivity = newActivity
            })
            // this.setLoadingMode(false)
            // this.setEditMode(false)
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingMode = false
            )


        }
    }


    updateActivity = async (activity: ActivityFormValues) => {
        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                if (activity.id) {
                    const updatedActivity = { ...this.getActivity(activity.id), ...activity }
                    this.activityRegistry.set(activity.id, updatedActivity as Activity)
                    this.selectedActivity = updatedActivity as Activity
                }
            })
        } catch (error) {
            console.log(error)
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


    updateAttendance = async () => {
        const user = store.userStore.user
        this.loadingMode = true
        try {
            await agent.Activities.attend(this.selectedActivity!.id)
            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(x => x.username !== user?.username)
                    this.selectedActivity.isGoing = false
                }
                else {
                    const attendee = new Profile(user!)
                    this.selectedActivity?.attendees?.push(attendee)
                    this.selectedActivity!.isGoing = true
                }
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
            })

        } catch (error) {
            console.log(error)

        }
        finally {
            runInAction(() => this.loadingMode = false)
        }
    }


    cancelActivityToggle = async () => {
        this.loadingMode = true
        try {
            await agent.Activities.attend(this.selectedActivity!.id)
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)

            })
        } catch (error) {
            console.log(error)
        }
        finally {
            runInAction(() =>
                this.loadingMode = false
            )

        }
    }
}