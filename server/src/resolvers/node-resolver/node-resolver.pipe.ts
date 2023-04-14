import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { NodeManagementService } from '../../node-management/node-management.service';
import { IPNotFoundError } from '../../errors/node-errors/node-errors';

@Injectable()
export class NodeResolverPipe implements PipeTransform {
  constructor(private nodeManagementService: NodeManagementService) {
  }
  transform(value: { gameCode: string, ip: string }, metadata: ArgumentMetadata) {
    const { gameCode, ip } = value;

    const node = this.nodeManagementService.findNode(gameCode, ip);

    if (!node)
      throw new IPNotFoundError(ip);

    return value;
  }
}
