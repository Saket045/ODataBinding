import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import MessageToast from "sap/m/MessageToast";
/**
 * @namespace library.controller
 */
export default class View2 extends Controller {
 public oDataModel : ODataModel;
    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const owner = this.getOwnerComponent() as any;
        const router = owner.getRouter();
        router.getRoute("View2").attachPatternMatched(this.onRouteMatched, this);  
        // (this.byId("studentTable")! as any).rebindTable();
    }
    public onRouteMatched():void{
        this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZUI_LIBRARY_X_O2");
    }
    public onCreatePress():void {
        console.log("Navigated");
        (this.getOwnerComponent() as any).getRouter().navTo("CreateStudent");
    }
    async onDeletePress(): Promise<void> {
        console.log("delete pressed")
        const oSmartTable = this.byId("studentTable") as any;
        const oTable = oSmartTable.getTable();
    
        if (!oTable || !oTable.getSelectedIndices) {
          console.log("no table")
          return
        }
    
        const selectedIndices = oTable.getSelectedIndices()
        if (selectedIndices.length === 0) {
          MessageToast.show("No rows selected")
          return
        }
    
        const oModel = (this.getView() as any).getModel()
    
        try {
          const selectedContexts = selectedIndices.map((index: number) => {
            console.log(oTable.getContextByIndex(index));
            return oTable.getContextByIndex(index);
          })
    
          const deletePromises = selectedContexts.map((context:any) => {
            return new Promise((resolve, reject) => {
              oModel.remove(context.getPath(), {
                success: (oData: any) => {
                  console.log("Entity deleted:", context.getPath())
                  resolve(oData)
                },
                error: (oError: any) => {
                  console.error("Delete failed for:", context.getPath(), oError)
                  reject(oError)
                },
              })
            })
          })
    
          await Promise.all(deletePromises)
          MessageToast.show(`${selectedIndices.length} record(s) deleted successfully!`)
    
          oTable.getBinding("rows").refresh()
        } catch (error) {
          console.error("Error during delete operation:", error)
          MessageToast.show("Delete operation failed")
        }
      }
}