import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
/**
 * @namespace library.controller
 */
export default class View1 extends Controller {
 public oDataModel : ODataModel;
    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const owner = this.getOwnerComponent() as any;
        const router = owner.getRouter();
        router.getRoute("View1").attachPatternMatched(this.onRouteMatched, this); 
        this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZUI_LIBRARY_X_O2"); 
        // (this.byId("bookTable")! as any).rebindTable();
    }
    public onRouteMatched():void{
        this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZUI_LIBRARY_X_O2");

    }
    public onCreatePress():void {
        console.log("Navigated");
        (this.getOwnerComponent() as any).getRouter().navTo("CreateBook");
    }
//     public async onDeletePress(): Promise<void>{
//         console.log("delete pressed");
//         const oSmartTable = this.byId("bookTable") as any;
//   const oTable = oSmartTable.getTable(); 
  
//   if (!oTable || !oTable.getSelectedIndices) {
//     console.log("no table");
//     return;
//   }
//   const selectedIndices = oTable.getSelectedIndices();
//   if (selectedIndices.length === 0) {
//     MessageToast.show("No rows selected");
//     return;
//   }
//   const indexesToDelete = selectedIndices.map((index: number) => {
//     const context =oTable.getContextByIndex(index);
//     const path = context.getPath(); 
//     console.log(path);    
//     console.log(parseInt(path.substring(8,10)));    
//     return parseInt(path.substring(8,10));
//   });
//   console.log(indexesToDelete);

// const oModel = (this.getView() as any).getModel(); 
// const sPath = "/Books";  


// try {
//     let booksData:any = await new Promise((resolve, reject) => {
//       oModel.read(sPath, {
//         success: function (oData:any) {
//           resolve(oData.results);
//         },
//         error: function (oError:any) {
//           reject(oError);
//         }
//       });
//     });
//     const updatedData = booksData.filter((_: any, index: number) =>
//         !indexesToDelete.includes(index)
//       );
//     console.log("Fetched data:", booksData);
//     console.log("Fetched data:", updatedData);
//     oModel.update(sPath, updatedData, {
//         method: "PUT",
//         success: function() {
//           MessageToast.show("Update successful!");
//         },
//         error: function(oError:any) {
//           MessageToast.show("Update failed");
//           console.error(oError);
//         }

//   }) } catch (error) {
//     console.error("Error reading data:", error);
//   }
//     }
async onDeletePress(): Promise<void> {
    console.log("delete pressed")
    const oSmartTable = this.byId("bookTable") as any;
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

public onEditPage(oEvent:any) : void{
  // const row = oEvent.getSource().getParent().getParent();
  // let context = row.getBindingContext()
  // console.log(context);
  // let rowData = context.getObject();
  // console.log(rowData);
  const row = oEvent.getSource().getParent().getParent();
  let sPath = row.getBindingContext().sPath;
  let newModel = new JSONModel();
  newModel.setProperty("/newPath",sPath);
  (this.getOwnerComponent() as any).setModel(newModel,"newModel"); 
  console.log(newModel.getProperty("/newPath"));
  const owner = this.getOwnerComponent() as any;
        const router = owner.getRouter();
        router.navTo("EditPage");
}

}