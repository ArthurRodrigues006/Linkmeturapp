import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async create(createDto: CreateNotificationDto, corpId: string): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...createDto,
      corp_id: corpId,
    });

    return await this.notificationRepository.save(notification);
  }

  async findAllByCorporation(corpId: string): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { corp_id: corpId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string, corpId: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id, corp_id: corpId },
    });

    if (!notification) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada.`);
    }

    return notification;
  }

  async getUnreadCount(corpId: string): Promise<number> {
    return await this.notificationRepository.count({
      where: { corp_id: corpId, lida: false },
    });
  }

  async markAsRead(id: string, corpId: string): Promise<Notification> {
    const notification = await this.findOne(id, corpId);
    notification.lida = true;
    return await this.notificationRepository.save(notification);
  }

  async markAllAsRead(corpId: string): Promise<void> {
    await this.notificationRepository.update(
      { corp_id: corpId, lida: false },
      { lida: true }
    );
  }

  async update(id: string, updateDto: UpdateNotificationDto, corpId: string): Promise<Notification> {
    const notification = await this.findOne(id, corpId);
    
    Object.assign(notification, updateDto);
    return await this.notificationRepository.save(notification);
  }

  async remove(id: string, corpId: string): Promise<void> {
    const result = await this.notificationRepository.delete({ id, corp_id: corpId });
    if (result.affected === 0) {
      throw new NotFoundException(`Notificação com ID ${id} não encontrada.`);
    }
  }
}
