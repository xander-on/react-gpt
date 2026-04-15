export interface AudioToTextResponse {
  duration : number;
  lang     : string;
  segments : Segment[];
  rawText  : string;
}

export interface Segment {
  text: string;
  time: string;
}



