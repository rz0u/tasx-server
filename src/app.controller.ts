import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/plain; charset=utf-8')
  getRoot(): string {
    return `
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  ████████╗  █████╗  ███████╗ ██╗  ██╗
  ╚══██╔══╝ ██╔══██╗ ██╔════╝ ╚██╗██╔╝
     ██║    ███████║ ███████╗  ╚███╔╝ 
     ██║    ██╔══██║ ╚════██║  ██╔██╗ 
     ██║    ██║  ██║ ███████║ ██╔╝ ██╗
     ╚═╝    ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝

▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
    `;
  }
}