import { ResourceController } from "./adapters/resource.controller";

const controller = new ResourceController();

const getResourceList = controller.getResourceList;

export { 
    getResourceList 
}