import { CustomResponse, FilterDto } from "@/kernel/types";
import { EventTypesStorageGateway } from "./event-types.storage.gateway";
import { ChangeEventTypeInteracor, FindAllEventTypesInteractor, FindPagedEventInteractor, SaveEventTypeinteractor, UpdateEventTypeInteractor } from "../use-cases/index";
import { EventType } from "../entities/EventType";
import { SaveEventTypeDto } from "../entities/save-event-type.dto";
import { UpdateEventTypeDto } from "../entities/update-event-type.dto";
export class EventTypeController {

    findPagedEventTypes(filter: FilterDto){
        try {
            const repository = new EventTypesStorageGateway()
            const findPagedEventTypesInteractor = new FindPagedEventInteractor(repository)
            return findPagedEventTypesInteractor.execute(filter)
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<EventType>
        }
    }

    saveEventType(saveEventType: SaveEventTypeDto){
        try {
            const repository = new EventTypesStorageGateway()
            const saveEventTypeInteractor = new SaveEventTypeinteractor(repository)
            return saveEventTypeInteractor.execute(saveEventType)
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<EventType>
        }
    }

    changeEventTypeStatus(id: number){
        try {
            const repository = new EventTypesStorageGateway()
            const changeEventTypeInteractor = new ChangeEventTypeInteracor(repository)
            return changeEventTypeInteractor.execute(id)
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<EventType>
        }
    }
    updateEventType(updateEventTypeDto: UpdateEventTypeDto){
        try {
            const repository = new EventTypesStorageGateway()
            const updateEventTypeInteractor = new UpdateEventTypeInteractor(repository)
            return updateEventTypeInteractor.execute(updateEventTypeDto)
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<EventType>
        }
    }

    findAllEventTypes(){
        try {
            const repository = new EventTypesStorageGateway()
            const findAllEventTypesInteractor = new FindAllEventTypesInteractor(repository)
            return findAllEventTypesInteractor.execute()
        } catch (error) {
            return {
                status: 500,
                message: 'Internal server error',
                error: true
            } as CustomResponse<EventType>
        }
    }

}