import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Contact } from 'src/contacts/entities/contact.entity';

@Entity('chat')
export class Chat extends BaseEntity {
  @Column({ type: 'uuid' })
  remetente_id= '';

  @Column({ type: 'uuid' })
  destinatario_id= '';

  @Column({ type: 'uuid', nullable: true })
  contact_id= '';

  @ManyToOne(() => Corporation, { eager: true })
  @JoinColumn({ name: 'remetente_id' })
  remetente!: Corporation;

  @ManyToOne(() => Corporation, { eager: true })
  @JoinColumn({ name: 'destinatario_id' })
  destinatario!: Corporation;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact!: Contact;

  @Column({ type: 'varchar', length: 100 })
  remetente_nome= '';

  @Column({ type: 'text' }) // conteúdo criptografado
  conteudo= '';

  @Column({ type: 'bytea' })
  iv: Buffer; // initialization vector

  @Column({ type: 'boolean', default: false })
  lida= false;
}
