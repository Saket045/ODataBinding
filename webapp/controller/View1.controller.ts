import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace library.controller
 */
export default class View1 extends Controller {
 public oDataModel : ODataModel;
    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const owner = this.getOwnerComponent() as any;
        const router = owner.getRouter();
        router.getRoute("View1").attachPatternMatched(this.onRouteMatched, this);    }
    public onRouteMatched():void{
        this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZUI_LIBRARY_X_O2");
        

    }
    public onCreatePress():void {
        console.log("Navigated");
        (this.getOwnerComponent() as any).getRouter().navTo("CreateBook");
    }
}