export class Content {
    constructor(public id:string,public title:string, public descrip:string,public img:string, public video:string){

    }

}
export interface ContentOMBDDTO{
    title: string;
    year: string;
    poster: string;
    imdbID: string;
 }
