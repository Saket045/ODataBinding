import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import View from "sap/ui/vk/View";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
export default class CreateBook extends Controller {
  public oDataModel : ODataModel;
  public formModel: JSONModel = new JSONModel({
    StudentId:"",
    StudentName:"",
    Email:"",
    Phone:"",
    Address:""
  });

  public onInit(): void{
    this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZUI_LIBRARY_X_O2");
    (this.getView() as any).setModel(this.formModel,"form");
    

  }

  public onSavePress(): void{
console.log(this.formModel);
console.log("hello");
    const data = this.formModel.getData();
    console.log(data);
    let that=this;
    this.oDataModel.create("/Students",data,{
        success: function () {
            MessageToast.show("Book created successfully!");
        },
        error: function () {
            MessageBox.error("Error while creating student");
        }
    })
    this.formModel.setData({
    StudentId:"",
    StudentName:"",
    Email:"",
    Phone:"",
    Address:""
    });
    
    (this.getOwnerComponent() as any).getRouter().navTo("View2");
  }

  public onInputChange(oEvent: any): void {
    const input = oEvent.getSource();
    const fieldName = input.getName(); 
console.log(fieldName);
    let value:any = "";
      value = input.getValue();

    this.formModel.setProperty(`/${fieldName}`, value);
    console.log(`${fieldName} updated to:`, value);
  }
   
}