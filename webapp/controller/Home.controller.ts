import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import UIComponent from "sap/ui/core/UIComponent";
import Router from "sap/ui/core/routing/Router";

/**
 * @namespace library.controller
 */
export default class Home extends Controller {

   
    public onInit(): void {
        console.log("Home controller initialized");
    }

    /**
     * Navigate to Student Management page
     */
    public onNavigateToStudents(): void {
        MessageToast.show("Navigating to Student Management...");
        
        const oRouter = this.getRouter();
        if (oRouter) {
            console.log("navigarted")
            oRouter.navTo("View2");
        }
    }

    /**
     * Navigate to Book Management page
     */
    public onNavigateToBooks(): void {
    
        const oRouter = this.getRouter();
        if (oRouter) {
            console.log("running");
            oRouter.navTo("View1");
        }
    }

    /**
     * Navigate to Transaction Management page
     */
    public onNavigateToTransactions(): void {
        MessageToast.show("Navigating to Transaction Management...");
        
        const oRouter = this.getRouter();
        if (oRouter) {
            oRouter.navTo("View3");
        }
    }

    /**
     * Get the router instance
     * @returns Router instance
     */
    private getRouter(): Router {
        return (this.getOwnerComponent() as UIComponent).getRouter();
    }
}