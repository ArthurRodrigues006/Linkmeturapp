import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../authentications/sevices/current-user.decorator';
import { JwtAuthGuard } from '../authentications/sevices/jwt-guard.guad';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // 🟢 CREATE
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar uma nova notificação' })
  @ApiBody({ type: CreateNotificationDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: NotificationResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreateNotificationDto,
    @CurrentUser() user: User,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationService.create(createDto, user.corp_id);
    return this.toResponseDto(notification);
  }

  // 🔍 FIND ALL
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todas as notificações da empresa' })
  @ApiResponse({ status: HttpStatus.OK, type: [NotificationResponseDto] })
  async findAll(@CurrentUser() user: User): Promise<NotificationResponseDto[]> {
    const notifications = await this.notificationService.findAllByCorporation(user.corp_id);
    return notifications.map((notification) => this.toResponseDto(notification));
  }

  // 🔍 FIND BY ID
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter notificação por ID' })
  @ApiParam({ name: 'id', description: 'ID da notificação' })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationResponseDto })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationService.findOne(id, user.corp_id);
    return this.toResponseDto(notification);
  }

  // 🔍 UNREAD
  @Get('unread/count')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Contar notificações não lidas' })
  @ApiResponse({ status: HttpStatus.OK, schema: { example: { count: 5 } } })
  async getUnreadCount(@CurrentUser() user: User): Promise<{ count: number }> {
    const count = await this.notificationService.getUnreadCount(user.corp_id);
    return { count };
  }

  // 🟡 MARK AS READ
  @Put(':id/read')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar notificação como lida' })
  @ApiParam({ name: 'id', description: 'ID da notificação' })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationResponseDto })
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationService.markAsRead(id, user.corp_id);
    return this.toResponseDto(notification);
  }

  // 🟡 MARK ALL AS READ
  @Put('read/all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar todas as notificações como lidas' })
  @ApiResponse({ status: HttpStatus.OK, schema: { example: { message: 'Todas as notificações foram marcadas como lidas' } } })
  async markAllAsRead(@CurrentUser() user: User): Promise<{ message: string }> {
    await this.notificationService.markAllAsRead(user.corp_id);
    return { message: 'Todas as notificações foram marcadas como lidas' };
  }

  // 🟡 UPDATE
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar notificação' })
  @ApiParam({ name: 'id', description: 'ID da notificação' })
  @ApiBody({ type: UpdateNotificationDto })
  @ApiResponse({ status: HttpStatus.OK, type: NotificationResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateNotificationDto,
    @CurrentUser() user: User,
  ): Promise<NotificationResponseDto> {
    const notification = await this.notificationService.update(id, updateDto, user.corp_id);
    return this.toResponseDto(notification);
  }

  // 🔴 DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover notificação' })
  @ApiParam({ name: 'id', description: 'ID da notificação' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    return await this.notificationService.remove(id, user.corp_id);
  }

  // ✅ Conversão para DTO
  private toResponseDto(notification: any): NotificationResponseDto {
    return {
      id: notification.id,
      titulo: notification.titulo,
      mensagem: notification.mensagem,
      tipo: notification.tipo,
      lida: notification.lida,
      metadata: notification.metadata,
      corp_id: notification.corp_id,
      created_at: notification.created_at,
      updated_at: notification.updated_at,
    };
  }
}
