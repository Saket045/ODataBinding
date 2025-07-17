import OverviewTile from "sap/ca/ui/OverviewTile";
import Button from "sap/m/Button";
import smartform from "sap/ui/comp/smartform/SmartForm";
import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import MessageToast from "sap/m/MessageToast";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import UpdateMethod from "sap/ui/model/odata/UpdateMethod";
 
export default class UpdatePage extends Controller {
  public oDataModel: ODataModel;
 
  public onInit(): void {
    const oRouter = UIComponent.getRouterFor(this);
    // oRouter.getRoute("EditPage")?.attachPatternMatched(this._onObjectMatched, this);
    console.log("Update Page Loaded");
  }
 
//   private _onObjectMatched(oEvent: any): void {
//     debugger
//     console.log(oEvent.getParameter("arguments"));
//     const sBookPath = decodeURIComponent(oEvent.getParameter("arguments").bookPath);
//     console.log(sBookPath)
 
//     this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZUI_LIBRARY_X_O2/", {
//       defaultCountMode: "None",
//       defaultUpdateMethod: UpdateMethod.Merge,
 
//     });
 
//     this.oDataModel.setDefaultBindingMode("TwoWay");
//     this.getView()?.setModel(this.oDataModel);
 
//     this.oDataModel.getMetaModel().loaded().then(() => {
//       this.byId("smartFormBookDetails")?.bindElement(sBookPath);
//     });
//   }
 
  public handleEditPress(): void {
    const oView = this.getView();
    const smartForm = oView?.byId("smartFormBookDetails") as smartform | undefined;
    const editBtn = oView?.byId("edit") as Button | undefined;
    const saveBtn = oView?.byId("save") as Button | undefined;
    const cancelBtn = oView?.byId("cancel") as Button | undefined;
 
    smartForm?.setEditable(true);
    editBtn?.setVisible(false);
    saveBtn?.setVisible(true);
    cancelBtn?.setVisible(true);
  }
 
  public handleSavePress(): void {
    const oView = this.getView();
    const smartForm = oView?.byId("smartFormBookDetails") as smartform | undefined;
    const editBtn = oView?.byId("edit") as Button | undefined;
    const saveBtn = oView?.byId("save") as Button | undefined;
    const cancelBtn = oView?.byId("cancel") as Button | undefined;
 
    const oModel = this.getModel();
    //get current context (path and data)
    const oContext = smartForm?.getBindingContext();
    if (!oContext) {
      MessageToast.show("not any update of data");
      return;
    }
const sPath = oContext.getPath();
const oData = oModel.getProperty(sPath);//current data
oModel.update(sPath,oData,{
success:() => {
  MessageToast.show("data update succesfully");
 
    smartForm?.setEditable(false);
    editBtn?.setVisible(true);
    saveBtn?.setVisible(false);
    cancelBtn?.setVisible(false);
 
    oModel.refresh();
  },
 
})
  }
 
  public getModel(): ODataModel {
    return this.getView()!.getModel() as ODataModel;
  }
 
  public handleCancelPress(): void {
    const oView = this.getView();
    const smartForm = oView?.byId("smartFormBookDetails") as smartform | undefined;
    const editBtn = oView?.byId("edit") as Button | undefined;
    const saveBtn = oView?.byId("save") as Button | undefined;
    const cancelBtn = oView?.byId("cancel") as Button | undefined;
 
    smartForm?.setEditable(false);
    editBtn?.setVisible(true);
    saveBtn?.setVisible(false);
    cancelBtn?.setVisible(false);
  }
}