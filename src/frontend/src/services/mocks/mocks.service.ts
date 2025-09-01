import { http } from "../../core/http";
import type { HttpResponse } from "../../core/http/types";
import type { Mock } from "./mocks.schema";
import { MockSchema } from "./mocks.schema";

export class MocksService {
  constructor(private client = http) {};

  async list(): Promise<HttpResponse<NonNullable<Mock[]>>> { // TODO: Pegar tipos do backend
    return await this.client.get<Mock[]>('/mocks', { responseSchema: MockSchema.array(), defaultData: [] })
  }

  async disableMock(mockId: string): Promise<HttpResponse> {
    return await this.client.post(`/mocks/${mockId}/disable`)
  }

  async enableMock(mockId: string): Promise<HttpResponse> {
    return await this.client.post(`/mocks/${mockId}/enable`)
  }
}

export const mocksService = new MocksService()
