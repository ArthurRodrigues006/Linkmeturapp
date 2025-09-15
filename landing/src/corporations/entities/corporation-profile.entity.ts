import { Corporation } from 'src/corporations/entities/corporation.entity';
import { BaseEntity } from 'src/database/entities/baseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('corporation_profile')
export class CorporationProfile extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  corp_id= '';

  @Column({ type: 'text', nullable: true })
  logo_url= '';

  @Column({ type: 'text', nullable: true })
  banner_url= '';

  @Column({ type: 'text', nullable: true })
  site= '';

  @Column({ type: 'text', nullable: true })
  descricao= '';

  @Column({ type: 'text', nullable: true })
  sobre= '';

  @Column({ type: 'jsonb', nullable: true })
  horario: Record<string, string> = {};

  @Column({ type: 'text', array: true, nullable: true })
  galeria= [];

  @Column({ type: 'text', nullable: true })
  instagram= '';

  @Column({ type: 'text', nullable: true })
  facebook= '';

  @Column({ type: 'text', nullable: true })
  linkedin= '';

  @Column({ type: 'text', nullable: true })
  youtube= '';

  @Column({ type: 'text', nullable: true })
  twitter= '';

  @Column({ type: 'text', array: true, nullable: true })
  certificacoes= [];

  @OneToOne(() => Corporation, (corporation) => corporation.profile, {
    cascade: true,
  })
  @JoinColumn({ name: 'corp_id' })
  corporation!: Corporation;
}
