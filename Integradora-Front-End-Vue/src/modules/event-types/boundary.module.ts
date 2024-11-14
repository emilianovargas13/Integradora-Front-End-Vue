import { EventTypeController } from "./adapters/event-types.controller";
const eventTypeController = new EventTypeController()
const findAllEventTypes = eventTypeController.findAllEventTypes
export { 
    findAllEventTypes 
}