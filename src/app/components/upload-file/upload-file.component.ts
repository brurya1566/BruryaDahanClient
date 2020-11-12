// import { Component, OnInit } from '@angular/core';
// import { FileUploader } from 'ng2-file-upload';
// import { ComponentService } from 'src/app/services/component.service';

// const uploadAPI = 'http://localhost:4000/api/upload'; 

// @Component({
//   selector: 'upload-file',
//   templateUrl: './upload-file.component.html',
// })
// export class UploadFileComponent implements OnInit {
//     constructor(private httpService: ComponentService){}
//   title = 'UploadFile';
//   file:any;
//   uploadState:number;
//   public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
//   ngOnInit() {
//     this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
//     this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
//       //  this.uploadState=this.httpService.uploadFile(file)
//          console.log('FileUpload:uploaded successfully:', item, status, response);
//          alert('Your file has been uploaded successfully');
//     };
//  }
// }