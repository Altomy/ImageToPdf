let html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Generate PDF</title>
    <style>
    body {
        background: rgb(204,204,204); 
      }
      page {
        background: white;
        display: block;
        margin: 0 auto;
        margin-bottom: 0.5cm;
        box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
      }
      withoutslice {
        background: white;
        display: block;
        margin: 0 auto;
        margin-bottom: 0.5cm;
        box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
        width: 21cm;
        height: auto; 
      }
      page[size="A4"] {  
        width: 21cm;
        height: 29.7cm; 
      }
    
      @media print {
        body, page {
          margin: 0;
          box-shadow: 0;
        }
      }
    </style>
  </head>
  <body>
      {imageHolder}
  </body>
</html>
`;

let imageHolder = `
<page size="A4">
<div style="width:21cm;height:100%;">
<div {paddingS}>
<img
src="{image}"
width="100%"
{imgH}
/>
</div>
</div>
</page>
`;

let pageWithoutSlice = `<withoutslice>
{children}
</withoutslice>`;

let imageHolderWithoutSlice = `
<div style="width:21cm;">
<div {paddingS}>
<img
src="{image}"
width="100%"
/>
</div>
</div>
`;

export { imageHolder, pageWithoutSlice, imageHolderWithoutSlice };

export default html;
