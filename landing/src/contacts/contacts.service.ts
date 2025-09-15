import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createDto: CreateContactDto, corpId: string): Promise<Contact> {
    const contact = this.contactRepository.create({
      ...createDto,
      corp_id: corpId,
    });

    return await this.contactRepository.save(contact);
  }

  async findAllByCorporation(corpId: string): Promise<Contact[]> {
    return await this.contactRepository.find({
      where: { corp_id: corpId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string, corpId: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne({
      where: { id, corp_id: corpId },
    });

    if (!contact) {
      throw new NotFoundException(`Contato com ID ${id} não encontrado.`);
    }

    return contact;
  }

  async search(query: string, corpId: string): Promise<Contact[]> {
    return await this.contactRepository
      .createQueryBuilder('contact')
      .where('contact.corp_id = :corpId', { corpId })
      .andWhere(
        '(contact.nome ILIKE :query OR contact.email ILIKE :query OR contact.empresa ILIKE :query)',
        { query: `%${query}%` },
      )
      .orderBy('contact.created_at', 'DESC')
      .getMany();
  }

  async update(id: string, updateDto: UpdateContactDto, corpId: string): Promise<Contact> {
    const contact = await this.findOne(id, corpId);
    
    Object.assign(contact, updateDto);
    return await this.contactRepository.save(contact);
  }

  async remove(id: string, corpId: string): Promise<void> {
    const result = await this.contactRepository.delete({ id, corp_id: corpId });
    if (result.affected === 0) {
      throw new NotFoundException(`Contato com ID ${id} não encontrado.`);
    }
  }

  async toggleFavorite(id: string, corpId: string): Promise<Contact> {
    const contact = await this.findOne(id, corpId);
    contact.favorited_contact = !contact.favorited_contact;
    return await this.contactRepository.save(contact);
  }
}
