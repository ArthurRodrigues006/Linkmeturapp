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
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactResponseDto } from './dto/contact-response.dto';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../authentications/sevices/current-user.decorator';
import { JwtAuthGuard } from '../authentications/sevices/jwt-guard.guad';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  // 🟢 CREATE
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo contato' })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: ContactResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreateContactDto,
    @CurrentUser() user: User,
  ): Promise<ContactResponseDto> {
    const contact = await this.contactsService.create(createDto, user.corp_id);
    return this.toResponseDto(contact);
  }

  // 🔍 FIND ALL
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os contatos da empresa' })
  @ApiResponse({ status: HttpStatus.OK, type: [ContactResponseDto] })
  async findAll(@CurrentUser() user: User): Promise<ContactResponseDto[]> {
    const contacts = await this.contactsService.findAllByCorporation(user.corp_id);
    return contacts.map((contact) => this.toResponseDto(contact));
  }

  // 🔍 FIND BY ID
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter contato por ID' })
  @ApiParam({ name: 'id', description: 'ID do contato' })
  @ApiResponse({ status: HttpStatus.OK, type: ContactResponseDto })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<ContactResponseDto> {
    const contact = await this.contactsService.findOne(id, user.corp_id);
    return this.toResponseDto(contact);
  }

  // 🔍 SEARCH
  @Get('search/query')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar contatos por nome ou email' })
  @ApiQuery({ name: 'q', description: 'Termo de busca' })
  @ApiResponse({ status: HttpStatus.OK, type: [ContactResponseDto] })
  async search(
    @Query('q') query: string,
    @CurrentUser() user: User,
  ): Promise<ContactResponseDto[]> {
    const contacts = await this.contactsService.search(query, user.corp_id);
    return contacts.map((contact) => this.toResponseDto(contact));
  }

  // 🟡 UPDATE
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar contato' })
  @ApiParam({ name: 'id', description: 'ID do contato' })
  @ApiBody({ type: UpdateContactDto })
  @ApiResponse({ status: HttpStatus.OK, type: ContactResponseDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateContactDto,
    @CurrentUser() user: User,
  ): Promise<ContactResponseDto> {
    const contact = await this.contactsService.update(id, updateDto, user.corp_id);
    return this.toResponseDto(contact);
  }

  // 🔴 DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover contato' })
  @ApiParam({ name: 'id', description: 'ID do contato' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    return await this.contactsService.remove(id, user.corp_id);
  }

  // ⭐ FAVORITE/UNFAVORITE
  @Post(':id/favorite')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Favoritar/desfavoritar contato' })
  @ApiParam({ name: 'id', description: 'ID do contato' })
  @ApiResponse({ status: HttpStatus.OK, type: ContactResponseDto })
  async toggleFavorite(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<ContactResponseDto> {
    const contact = await this.contactsService.toggleFavorite(id, user.corp_id);
    return this.toResponseDto(contact);
  }

  // ✅ Conversão para DTO
  private toResponseDto(contact: any): ContactResponseDto {
    return {
      id: contact.id,
      nome: contact.nome,
      email: contact.email,
      telefone: contact.telefone,
      empresa: contact.empresa,
      cargo: contact.cargo,
      observacoes: contact.observacoes,
      favorited_contact: contact.favorited_contact,
      corp_id: contact.corp_id,
      created_at: contact.created_at,
      updated_at: contact.updated_at,
    };
  }
}
