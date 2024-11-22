import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SaveContentsRequestDto } from './dto/save-contents.request.dto';

@Injectable()
export class MemberService {
  private members: Map<string, { id: string; password: string }> = new Map();
  private contents: Map<string, SaveContentsRequestDto> = new Map(); // 콘텐츠 저장용 Map (id별 1개의 콘텐츠)

  signUp(id: string, password: string) {
    this.members.set(id, { id, password });

    return {
      id: id,
    };
  }

  saveContents(id: string, body: SaveContentsRequestDto) {
    if (!this.members.has(id)) {
      throw new UnauthorizedException();
    }

    this.contents.set(id, body);

    return {
      contents: this.contents.get(id),
    };
  }

  getContents(id: string) {
    if (!this.members.has(id)) {
      throw new UnauthorizedException();
    }

    return this.members.get(id);
  }

  // 모든 멤버 정보 반환
  getAllMembers() {
    return Array.from(this.members.values());
  }

  // 모든 콘텐츠 정보 반환
  getAllContents() {
    return Array.from(this.contents.entries()).map(([id, content]) => ({
      id,
      ...content
    }));
  }
}
