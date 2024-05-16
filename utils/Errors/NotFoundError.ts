import { NotFoundException } from "@nestjs/common";




export function notFoundError(msg: string) {
  throw new NotFoundException(msg);
}


