import { writeFileSync, appendFileSync } from "fs";

export function write(fp: string = "debug.log", data: any, overwrite = false) {
  let writer = overwrite ? writeFileSync : appendFileSync;
  writer(fp, data);  // actually write the data
}