using System.Collections.Generic;
using Api.Music.Controllers.Models;
using Api.Music.Repositories.Documents;

namespace Api.Music.Services
{
    internal static class MusicMapper
    {
        internal static List<MusicResponse> Map(List<MusicDocument> musics)
        {
            return musics.ConvertAll<MusicResponse>(m => Map(music: m));
        }

        internal static MusicResponse Map(MusicDocument music)
        {
            return new MusicResponse
            {
                Artist = music.Artist,
                ArtistAlphabetCategory = music.ArtistAlphabetIndex,
                Id = music.Id,
                IsFavorite = music.IsFavorite,
                Length = music.Length,
                Path = music.Path,
                Title = music.Title,
            };
        }
    }
}