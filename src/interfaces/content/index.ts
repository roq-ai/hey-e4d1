import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  type: string;
  file_path: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  file_path?: string;
  organization_id?: string;
}
