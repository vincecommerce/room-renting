import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from 'src/auth'

import { ResponseDto } from 'src/utils/dto'
import { AddRoomDto, EditRoomDto, RoomDto, RoomsDto } from './dto/rooms.dto'
import { RoomService } from './rooms.service'

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addRoom(@Body() body: AddRoomDto): Promise<ResponseDto> {
    const room = await this.roomService.addRoom(body)

    return new ResponseDto({
      id: room.id,
      code: 200,
      message: 'The room has been created',
    })
  }

  @Get(':roomId')
  async getRoom(@Param('roomId') id: string): Promise<RoomDto> {
    const room = await this.roomService.getRoom(id)
    return room
  }

  @Get()
  async getRooms(): Promise<RoomsDto[]> {
    const rooms = await this.roomService.getRooms()
    return rooms
  }

  @Put(':roomId')
  @UseGuards(AuthGuard)
  async editRoom(
    @Param('roomId') id: string,
    @Body() body: EditRoomDto,
  ): Promise<ResponseDto> {
    const room = await this.roomService.updateRoom(id, body)

    return new ResponseDto({
      id: room.id,
      code: 200,
      message: `${room.name} has been edited`,
    })
  }

  @Delete(':roomId')
  @UseGuards(AuthGuard)
  async deleteRoom(@Param('roomId') id: string): Promise<ResponseDto> {
    const room = await this.roomService.deleteRoom(id)

    return new ResponseDto({
      id: room.id,
      code: 200,
      message: `The room has been deleted`,
    })
  }
}
