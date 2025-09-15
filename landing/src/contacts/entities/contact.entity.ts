import { Chat } from 'src/chats/entities/chat.entity';
import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Contact extends BaseEntity {
  @Column({ type: 'uuid' })
  corporation_id= '';

  @Column({ type: 'uuid' })
  contact_id: string; // pode ser User.id ou Corporation.id

  @ManyToOne(() => Corporation, (corp) => corp.contacts)
  @JoinColumn({ name: 'corporation_id' })
  corporation!: Corporation;

  @ManyToOne(() => User, { nullable: true }) // se for contato de usuário
  @JoinColumn({ name: 'contact_id' })
  contactUser!: User;

  @Column({ type: 'boolean', default: false })
  block_contact= false;

  @Column({ type: 'boolean', default: true })
  saved_contact= false;

  @Column({ type: 'boolean', default: false })
  favorited_contact= false;
}
