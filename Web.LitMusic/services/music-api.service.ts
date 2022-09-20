// types
import {
  MusicResponse,
  UpdateMusicFavoriteRequest,
  SearchMusicRequest,
  AddMusicRequest,
  UpdateMusicRequest,
} from "./types/api";

// third party
import axios, { AxiosResponse } from "axios";

export class MusicApiService {
  private readonly musicUrlSegment: string =
    process.env.NEXT_PUBLIC_REACT_APP_API + "/music";

  public async searchMusic(
    request: SearchMusicRequest = {} as SearchMusicRequest
  ): Promise<MusicResponse[]> {
    const querySegments: string[] = [];

    if (request.sortBy) {
      querySegments.push("sortBy=" + request.sortBy);
    }

    if (typeof request.isFavorite === "boolean") {
      querySegments.push("isFavorite=" + request.isFavorite);
    }

    if (request.title) {
      querySegments.push("title=" + request.title);
    }

    return (
      await axios.get(`${this.musicUrlSegment}?${querySegments.join("&")}`)
    )?.data;
  }

  public async getMusic(id: string): Promise<MusicResponse> {
    return (await axios.get(`${this.musicUrlSegment}/${id}`))?.data;
  }

  public addMusic(request: AddMusicRequest): Promise<AxiosResponse> {
    return axios.post(this.musicUrlSegment, request);
  }

  public updateFavoriteMusic(
    id: string,
    request: UpdateMusicFavoriteRequest
  ): Promise<AxiosResponse> {
    return axios.put(`${this.musicUrlSegment}/${id}/favorite`, request);
  }

  public updateMusic(
    id: string,
    request: UpdateMusicRequest
  ): Promise<AxiosResponse> {
    return axios.put(`${this.musicUrlSegment}/${id}`, request);
  }

  public removeMusic(id: string): Promise<AxiosResponse> {
    return axios.delete(`${this.musicUrlSegment}/${id}`);
  }
}
