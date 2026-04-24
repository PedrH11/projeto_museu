'use client';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Box,
  Calendar,
  Camera,
  Check,
  Contact2Icon,
  Lock,
  LockIcon,
  ShieldCheck,
  ShieldUser,
  User,
  X,
} from 'lucide-react';
import { ResourcesResponse } from '../../../schemas/resources-schemas';
import { useDictionary } from '../../../service/providers/i18n-providers';

interface PermissionMatrixProps {
  nomeRoles: string;
  resources: ResourcesResponse[];
}

export default function PermissionMatrixForm({
  nomeRoles,
  resources,
}: PermissionMatrixProps) {
  const dict = useDictionary();
  const nav = dict.navigation;

  console.log(nomeRoles);

  const iconResources = [
    { id: 'dashboard', label: nav.dashboards, icon: ShieldCheck },
    { id: 'usuario', label: nav.usuario.usuario, icon: User },
    { id: 'contato', label: nav.contato.contato, icon: Contact2Icon },
    { id: 'evento', label: nav.eventos, icon: Calendar },
    { id: 'roles', label: nav.roles.roles, icon: ShieldUser },
    { id: 'permissions', label: nav.permissions.permissions, icon: LockIcon },
    { id: 'resources', label: nav.resources.resources, icon: Box },
    { id: 'fotos', label: 'Fotos', icon: Camera },
  ];

  const actions = [
    { id: 'view', label: 'Visualizar' },
    { id: 'create', label: 'Criar' },
    { id: 'edit', label: 'Editar' },
    { id: 'delete', label: 'Excluir' },
  ];

  // Função auxiliar para encontrar o ícone e label traduzido
  const getResourceConfig = (nomeBanco: string) => {
    const normalized = nomeBanco
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .trim();

    // Tenta encontrar o match exato ou por começo da palavra (ex: usuario x usuarios)
    return iconResources.find(
      (item) =>
        normalized.startsWith(item.id) || item.id.startsWith(normalized),
    );
  };

  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Matriz de Permissões</h3>
        </div>
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/20"
        >
          Perfil: {nomeRoles}
        </Badge>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[300px]">Recurso / Módulo</TableHead>
            {actions.map((action) => (
              <TableHead key={action.id} className="text-center">
                {action.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => {
            // Buscamos a configuração correspondente
            const config = getResourceConfig(resource.nomeResources);
            const Icon = config?.icon || Box; // Fallback para Box
            const label = config?.label || resource.nomeResources; // Fallback para o nome do banco

            return (
              <TableRow
                key={resource.idResources}
                className="hover:bg-accent/5"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-md">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span>{label}</span>
                  </div>
                </TableCell>

                {actions.map((action) => (
                  <TableCell
                    key={`${resource.idResources}-${action.id}`}
                    className="text-center"
                  >
                    <div className="flex justify-center">
                      <Checkbox
                        id={`${resource.idResources}-${action.id}`}
                        defaultChecked={nomeRoles === 'Administrador'}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="p-4 bg-muted/20 border-t text-xs text-muted-foreground flex justify-between">
        <span>{dict.permissions.management.message_permissions}</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <Check className="h-3 w-3 text-green-500" /> Permitido
          </div>
          <div className="flex items-center gap-1">
            <X className="h-3 w-3 text-red-500" /> Negado
          </div>
        </div>
      </div>
    </div>
  );
}
