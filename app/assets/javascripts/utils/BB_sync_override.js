// Backbone._sync = Backbone.sync;
// Backbone.sync = function (method:string, model:Backbone.Model, options?: any){
//     if(options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
//         options.contentType = 'application/json';
//         var data:any = JSON.stringify(options.attrs || model.toJSON(options));
//         if(model.paramRoot) {
//             data = {};
//             data[model.paramRoot] = model.toJSON(options);
//         } else {
//             data = model.toJSON();
//         }
//         options.data = JSON.stringify(data);
//     }
//     return Backbone._sync(method, model, options);
// }