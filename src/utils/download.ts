import {XMLBuilder} from "fast-xml-parser";

export const  downloadObjectAsXML=(exportObj:any, exportName:string)=>{
    const builder = new XMLBuilder({});
    const xmlContent = builder.build({content:exportObj});

    const dataStr = "data:text/xml;charset=utf-8," + xmlContent;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".xml");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
