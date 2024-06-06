require("dotenv").config();
import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { Connect_DB } from './src/database/mongodb';
import { authticate_admin, authticate_owner } from './src/middlewares/middlewares';
import { create_admin } from './src/requests/owner_requests';
import { admin_login } from './src/requests/admin_requests';
import { create_category, delete_category, get_all_categories, get_category_by_id, update_category } from './src/requests/category_requests';
import { create_naat_khawan, delete_naat_khawan, get_all_naat_khawans, get_naat_khawan_by_id, update_naat_khawan } from './src/requests/naatkhawan_requests';
import { create_album, delete_album, get_album_by_id, get_all_album, update_album } from './src/requests/album_requests';
import { create_audio, delete_audio, get_all_audios, get_audio_by_id, update_audio } from './src/requests/audio_requests';
import { create_playlist, delete_playlist, get_all_playlists, get_playlist_by_id, update_playlist } from './src/requests/playlist_requests';
import { dashboard } from './src/requests/dashboard_requests';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: `50mb`, extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Node.js!');
});

// OWNER END-POINTs
app.post("/api/owner/createAdmin", authticate_owner, create_admin);

// ADMIN END-POINTs
app.post("/api/admin/login", admin_login);


app.post("/api/dashboard", authticate_admin, dashboard);

// Add Category
app.post("/api/createCategory",authticate_admin ,create_category);
// Get All Categories
app.post("/api/getAllCategories", authticate_admin, get_all_categories);
// Get Category By Id
app.post("/api/getCategoryById/:id", authticate_admin, get_category_by_id);
// Update Category By Id
app.post('/api/updateCategory/:id', authticate_admin, update_category);
// Delete Category
app.post("/api/deleteCategory/:id", authticate_admin, delete_category);


// API endpoint for creating Naat Khawans
app.post("/api/createNaatKhawan", authticate_admin, create_naat_khawan);
// Get All naatKhawans
app.post("/api/getAllNaatKhawans", authticate_admin, get_all_naat_khawans);
// Get Category By Id
app.post("/api/getNaatKhawanById/:id", authticate_admin, get_naat_khawan_by_id);
// Update Category By Id
app.post('/api/updateNaatKhawan/:id', authticate_admin, update_naat_khawan);
// Delete naatKhawans
app.post("/api/deleteNaatKhawan/:id", authticate_admin, delete_naat_khawan);


// API endpoint for creating Album
app.post("/api/createAlbum", authticate_admin, create_album);
// API endpoint for getting all Album
app.post("/api/getAllAlbum", authticate_admin, get_all_album);
// API endpoint for get Album by id
app.post("/api/getAlbumById", authticate_admin, get_album_by_id);
// API endpoint for update album
app.post("/api/updateAlbum/:id", authticate_admin, update_album);
// API endpoint for delete Album
app.post("/api/deleteAlbum/:id", authticate_admin, delete_album);


// API endpoint for creating Audio
app.post("/api/createAudio", authticate_admin, create_audio);
// API endpoint for getting all Audio
app.post("/api/getAllAudio", authticate_admin, get_all_audios);
// API endpoint for get Album by id
app.post("/api/getAudioById/:id", authticate_admin, get_audio_by_id);
// API endpoint for update album
app.post("/api/updateAudio/:id", authticate_admin, update_audio);
// API endpoint for delete Audio
app.post("/api/deleteAudio/:id", authticate_admin, delete_audio);



// API endpoint for creating Playlist
app.post("/api/createPlaylist", authticate_admin, create_playlist);
// API endpoint for getting all Playlist
app.post("/api/getAllPlaylist", authticate_admin, get_all_playlists);
// API endpoint for get Playlist by id
app.post("/api/getPlaylistById/:id", authticate_admin, get_playlist_by_id);
// API endpoint for update Playlist
app.post("/api/updatePlaylist/:id", authticate_admin, update_playlist);
// API endpoint for delete Playlist
app.post("/api/deletePlaylist/:id", authticate_admin, delete_playlist);


Connect_DB().then(() => {
    app.listen(PORT, async () =>
      console.log(`Server started at URL: http://localhost:${PORT}`)
    );
});
