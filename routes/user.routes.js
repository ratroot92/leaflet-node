const express = require("express");
const userRouter = express.Router();
const { check, validationResult } = require("express-validator");
const DB=require('./../config/db')


userRouter.post(
  "/users/signup",
  [
    check("username", "username is required")
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("Username must contain at least 5 characters")
      .isLength({ max: 15 })
      .withMessage("Username can contain max 15 characters")
      .custom(async username => {
        const value = await isMentionNameInUse(username);
        if (value) {
            throw new Error('Username  already exists!!!');
        }
    }),
    check("email", "Email is required").notEmpty().isEmail(),
    check("password", "Password is required")
      .notEmpty()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must contain at least 5 characters")
      .isLength({ max: 20 })
      .withMessage("Password can contain max 60 characters"),
    check("c_password").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password  do not match");
      }
      return true;
    }),
    check("country", "Country is required").notEmpty(),
    check("birthday", "Birthday date is required").notEmpty(),
    check("sex", "Sex is required").notEmpty(),
    check("phone", "Phone number  is required").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      username,
      email,
      password,
      c_password,
      country,
      birthday,
      phone,
      sex,
    } = req.body;
    // console.log(req.body);
    // DB.query(`SELECT COUNT(*) AS total FROM cb_users WHERE   username=?`, [username], function (err, result) {
    //   //result of the query is stored in 'result' and the error, if any, are stored in err
    //   if(!error){
    //     console.log("MENTION COUNT : "+results[0].total);
    //     return resolve(results[0].total > 0);
    // } else {
    //     return reject(new Error('Database error!!'));
    // }
    // });

    res.status(200).json("success");
  }
);

function isMentionNameInUse(mentionName){
  
    return new Promise((resolve, reject) => {
        DB.query('SELECT COUNT(*) AS total FROM cb_users WHERE   username=?', [mentionName], function (error, results, fields) {
            if(!error){
                console.log("MENTION COUNT : "+results[0].total);
                return resolve(results[0].total > 0);
            } else {
                return reject(new Error('Database error!!'));
            }
          }
        );
    });
}

// ###############################################
// GET :: http://deikho.com/header_data
// ###############################################
userRouter.get("/header_data", (req, res) => {
  let data = {
    status: "",
    name: "",
    value: "",
  };

  // ###############################################
  // req["headers"]=== WILL ALWAYS OUTPUT KEYS IN LOWER CASE
  // ###############################################
  let All_Headers = req["headers"];

  // for (var key in All_Headers)
  if (All_Headers["x-msisdn"]) {
    {
      let Header_Value = All_Headers["x-msisdn"];

      data["status"] = true;
      data["name"] = "msisdn";
      data["value"] = Header_Value;

      // res.setHeader("Content-Type", "application/json")
      // res.send(data);
      res.send(data);
    }
  } else {
    data["status"] = false;
    data["name"] = "msisdn";
    data["value"] = "";
    res.send(data);
  }

  // res.setHeader("Content-Type", "application/json")
});

userRouter.get("/base/configss", (req, res) => {
  // console.log(req.body)
  // console.log("Request Dispateched ")
  let configs = {
    index_recent: "6",
    index_featured: "3",
    clientid: "your_client_id_here",
    secretId: "your_client_secret_here",
    youtube_api_key: "",
    site_title: "Deikho",
    site_slogan: "Aur Deikhty Jao ",
    baseurl: "https://deikho.com",
    basedir: "/var/www/html",
    template_dir: "cb_28",
    player_file: "cb_video_js.php",
    closed: "",
    closed_msg: "",
    description: "Deikho is a video streaming platform.",
    keywords: "",
    ffmpegpath: "/opt/bin/ffmpeg",
    flvtool2path: "",
    mp4boxpath: "/usr/bin/MP4Box",
    vbrate: "300000",
    srate: "44100",
    r_height: "",
    r_width: "",
    resize: "",
    mencoderpath: "",
    keep_original: "",
    activation: "1",
    mplayerpath: "",
    email_verification: "1",
    allow_registeration: "1",
    php_path: "/usr/bin/php",
    videos_list_per_page: "30",
    channels_list_per_page: "25",
    videos_list_per_tab: "1",
    channels_list_per_tab: "1",
    video_comments: "1",
    video_rating: "1",
    comment_rating: "1",
    video_download: "",
    video_embed: "1",
    groups_list_per_page: "25",
    seo: "no",
    admin_pages: "100",
    search_list_per_page: "25",
    recently_viewed_limit: "10",
    max_upload_size: "1000",
    sbrate: "320000",
    thumb_width: "",
    thumb_height: "",
    user_comment_opt1: "",
    ffmpeg_type: "",
    user_comment_opt2: "",
    user_comment_opt3: "",
    user_comment_opt4: "",
    user_rate_opt1: "",
    captcha_type: "0",
    allow_upload: "",
    allowed_types:
      "wmv,avi,divx,3gp,mov,mpeg,mpg,xvid,flv,asf,rm,dat,mp4,png,jpg",
    version: "2.0.1",
    version_type: "Alpha",
    allow_template_change: "1",
    allow_language_change: "",
    default_site_lang: "",
    video_require_login: "",
    audio_codec: "libfdk_aac",
    con_modules_type: "",
    remoteUpload: "",
    embedUpload: "",
    player_div_id: "",
    code_dev: "(Powered by ClipBucket)",
    sys_os: "",
    debug_level: "",
    enable_troubleshooter: "1",
    vrate: "",
    num_thumbs: "3",
    big_thumb_width: "",
    big_thumb_height: "",
    user_max_chr: "15",
    disallowed_usernames: "shit, asshole, fucker",
    min_age_reg: "0",
    max_comment_chr: "800",
    user_comment_own: "",
    anonym_comments: "yes",
    player_dir: "CB_video_js",
    player_width: "661",
    player_height: "360",
    default_country_iso2: "PK",
    channel_player_width: "600",
    channel_player_height: "281",
    videos_items_grp_page: "1",
    videos_items_hme_page: "1",
    videos_items_columns: "1",
    videos_items_ufav_page: "25",
    videos_items_uvid_page: "1",
    videos_items_search_page: "30",
    videos_item_channel_page: "1",
    users_items_subscriptions: "5",
    users_items_subscibers: "5",
    users_items_contacts_channel: "5",
    users_items_search_page: "12",
    users_items_group_page: "15",
    cbhash:
      "PGRpdiBhbGlnbj0iY2VudGVyIj48IS0tIERvIG5vdCByZW1vdmUgdGhpcyBjb3B5cmlnaHQgbm90aWNlIC0tPg0KUG93ZXJlZCBieSA8YSBocmVmPSJodHRwOi8vY2xpcC1idWNrZXQuY29tLyI+Q2xpcEJ1Y2tldDwvYT4gJXMgfCA8YSBocmVmPSJodHRwOi8vY2xpcC1idWNrZXQuY29tL2Fyc2xhbi1oYXNzYW4iPkFyc2xhbiBIYXNzYW48L2E+DQo8IS0tIERvIG5vdCByZW1vdmUgdGhpcyBjb3B5cmlnaHQgbm90aWNlIC0tPjwvZGl2Pg==",
    min_video_title: "4",
    max_video_title: "8000",
    min_video_desc: "5",
    max_video_desc: "3000",
    video_categories: "10",
    min_video_tags: "3",
    max_video_tags: "3000",
    video_codec: "libx264",
    date_released: "01-05-2010",
    date_installed: "01-05-2010",
    date_updated: "2010-01-09 18:36:16",
    support_email: "webmaster@localhost",
    website_email: "webmaster@localhost",
    welcome_email: "webmaster@localhost",
    anonymous_id: "159",
    date_format: "Y-m-d",
    default_time_zone: "Australia/Adelaide",
    autoplay_video: "no",
    channel_comments: "1",
    max_profile_pic_size: "2500",
    max_profile_pic_height: "",
    max_profile_pic_width: "230",
    gravatars: "no",
    picture_url: "yes",
    picture_upload: "yes",
    background_url: "yes",
    background_upload: "yes",
    max_bg_size: "2500",
    max_bg_width: "1600",
    max_bg_height: "",
    background_color: "yes",
    send_comment_notification: "yes",
    approve_video_notification: "yes",
    keep_mp4_as_is: "",
    hq_output: "",
    grp_categories: "",
    grps_items_search_page: "25",
    grp_thumb_height: "",
    grp_thumb_width: "",
    grp_max_title: "",
    grp_max_desc: "",
    quick_conv: "",
    server_friendly_conversion: "",
    max_conversion: "5",
    max_time_wait: "7200",
    allow_unicode_usernames: "",
    min_username: "3",
    max_username: "15",
    youtube_enabled: "yes",
    allow_username_spaces: "",
    use_playlist: "yes",
    comments_captcha: "guests",
    player_logo_file: "logo.jpg",
    logo_placement: "tl",
    buffer_time: "5",
    use_ffmpeg_vf: "",
    own_photo_rating: "",
    mail_type: "mail",
    smtp_host: "",
    smtp_user: "",
    smtp_pass: "",
    smtp_auth: "no",
    smtp_port: "",
    use_subs: "",
    pak_license: "",
    photo_ratio: "16:10",
    photo_thumb_width: "600",
    photo_thumb_height: "75",
    photo_med_width: "300",
    photo_med_height: "116",
    photo_lar_width: "600",
    photo_crop: "1",
    photo_multi_upload: "5",
    photo_download: "1",
    photo_comments: "1",
    photo_rating: "1",
    max_photo_size: "2",
    watermark_photo: "0",
    watermark_max_width: "120",
    watermark_placement: "left:top",
    load_upload_form: "yes",
    load_remote_upload_form: "yes",
    load_embed_form: "yes",
    load_link_video_form: "yes",
    enable_groups: "",
    groupsSection: "",
    videosSection: "yes",
    photosSection: "yes",
    homeSection: "yes",
    signupSection: "yes",
    uploadSection: "yes",
    collectionsSection: "no",
    channelsSection: "yes",
    flvtoolpp: "",
    normal_resolution: "",
    high_resolution: "",
    max_video_duration: "320",
    embed_player_height: "176",
    embed_player_width: "300",
    autoplay_embed: "yes",
    playlistsSection: "yes",
    photo_main_list: "1",
    photo_home_tabs: "1",
    photo_search_result: "1",
    photo_channel_page: "1",
    photo_user_photos: "1",
    photo_user_favorites: "1",
    photo_other_limit: "1",
    collection_per_page: "30",
    collection_home_page: "10",
    collection_search_result: "20",
    collection_channel_page: "10",
    collection_user_collections: "20",
    collection_user_favorites: "20",
    collection_items_page: "20",
    reCaptcha_private_key: "6LcQI8ESAAAAALc_oz1xuNsBVRNx554CaJHjcoXt",
    reCaptcha_public_key: "6LcQI8ESAAAAALN1vYQovst9c6nlU52iHdqWExp8",
    channel_rating: "1",
    own_channel_rating: "1",
    collection_rating: "1",
    own_collection_rating: "1",
    own_video_rating: "1",
    vbrate_hd: "",
    store_guest_session: "no",
    delete_mass_upload: "no",
    use_crons: "no",
    pseudostreaming: "yes",
    comments_per_page: "15",
    embed_type: "iframe",
    feedsSection: "yes",
    enlarge_button: "no",
    max_topic_length: "",
    max_topic_title: "",
    facebook_embed: "yes",
    seo_vido_url: "1",
    use_cached_pagin: "yes",
    cached_pagin_time: "5",
    player_logo_url: "http://clip-bucket.com/",
    cb_combo_res: "yes",
    ffprobe_path: "/opt/bin/ffprobe",
    media_info: "/usr/bin/mediainfo",
    i_magick: "/usr/bin/convert",
    gen_240: "yes",
    gen_360: "yes",
    gen_480: "yes",
    gen_720: "yes",
    gen_1080: "yes",
    photo_activation: "1",
    stay_mp4: "no",
    popup_video: "",
    video_round_views: "yes",
    vbrate_240: "320000",
    vbrate_360: "400000",
    vbrate_480: "480000",
    vbrate_720: "560000",
    vbrate_1080: "640000",
    use_watermark: "",
    stream_via: "hls",
    access_to_logged_in: "no",
    cb_license: "CBCORP-XXXXXXXXXXX",
    cb_license_local: "",
    keep_downloadable_files: "yes",
    disable_embedded_videos: "no",
    gen_1440: "",
    gen_2160: "",
    vbrate_1440: "",
    vbrate_2160: "",
    conversion_profile: "",
    elastic_server_ip: "http://localhost",
    blocked_countries: "",
    enable_cat_featured_vid: "no",
    trending_video: "yes",
    recent_video: "yes",
    countries: [
      {
        name_en: "Afghanistan",
        iso2: "AF",
      },
      {
        name_en: "Albania",
        iso2: "AL",
      },
      {
        name_en: "Algeria",
        iso2: "DZ",
      },
      {
        name_en: "American Samoa",
        iso2: "AS",
      },
      {
        name_en: "Andorra",
        iso2: "AD",
      },
      {
        name_en: "Angola",
        iso2: "AO",
      },
      {
        name_en: "Anguilla",
        iso2: "AI",
      },
      {
        name_en: "Antarctica",
        iso2: "AQ",
      },
      {
        name_en: "Antigua and Barbuda",
        iso2: "AG",
      },
      {
        name_en: "Argentina",
        iso2: "AR",
      },
      {
        name_en: "Armenia",
        iso2: "AM",
      },
      {
        name_en: "Aruba",
        iso2: "AW",
      },
      {
        name_en: "Australia",
        iso2: "AU",
      },
      {
        name_en: "Austria",
        iso2: "AT",
      },
      {
        name_en: "Azerbaijan",
        iso2: "AZ",
      },
      {
        name_en: "Bahamas",
        iso2: "BS",
      },
      {
        name_en: "Bahrain",
        iso2: "BH",
      },
      {
        name_en: "Bangladesh",
        iso2: "BD",
      },
      {
        name_en: "Barbados",
        iso2: "BB",
      },
      {
        name_en: "Belarus",
        iso2: "BY",
      },
      {
        name_en: "Belgium",
        iso2: "BE",
      },
      {
        name_en: "Belize",
        iso2: "BZ",
      },
      {
        name_en: "Benin",
        iso2: "BJ",
      },
      {
        name_en: "Bermuda",
        iso2: "BM",
      },
      {
        name_en: "Bhutan",
        iso2: "BT",
      },
      {
        name_en: "Bolivia",
        iso2: "BO",
      },
      {
        name_en: "Bosnia and Herzegovina",
        iso2: "BA",
      },
      {
        name_en: "Botswana",
        iso2: "BW",
      },
      {
        name_en: "Bouvet Island",
        iso2: "BV",
      },
      {
        name_en: "Brazil",
        iso2: "BR",
      },
      {
        name_en: "British Indian Ocean Territory",
        iso2: "IO",
      },
      {
        name_en: "Brunei Darussalam",
        iso2: "BN",
      },
      {
        name_en: "Bulgaria",
        iso2: "BG",
      },
      {
        name_en: "Burkina Faso",
        iso2: "BF",
      },
      {
        name_en: "Burundi",
        iso2: "BI",
      },
      {
        name_en: "Cambodia",
        iso2: "KH",
      },
      {
        name_en: "Cameroon",
        iso2: "CM",
      },
      {
        name_en: "Canada",
        iso2: "CA",
      },
      {
        name_en: "Cape Verde",
        iso2: "CV",
      },
      {
        name_en: "Cayman Islands",
        iso2: "KY",
      },
      {
        name_en: "Central African Republic",
        iso2: "CF",
      },
      {
        name_en: "Chad",
        iso2: "TD",
      },
      {
        name_en: "Chile",
        iso2: "CL",
      },
      {
        name_en: "China",
        iso2: "CN",
      },
      {
        name_en: "Christmas Island",
        iso2: "CX",
      },
      {
        name_en: "Cocos (Keeling) Islands",
        iso2: "CC",
      },
      {
        name_en: "Colombia",
        iso2: "CO",
      },
      {
        name_en: "Comoros",
        iso2: "KM",
      },
      {
        name_en: "Congo",
        iso2: "CG",
      },
      {
        name_en: "Congo, the Democratic Republic of the",
        iso2: "CD",
      },
      {
        name_en: "Cook Islands",
        iso2: "CK",
      },
      {
        name_en: "Costa Rica",
        iso2: "CR",
      },
      {
        name_en: "Cote D Ivoire",
        iso2: "CI",
      },
      {
        name_en: "Croatia",
        iso2: "HR",
      },
      {
        name_en: "Cuba",
        iso2: "CU",
      },
      {
        name_en: "Cyprus",
        iso2: "CY",
      },
      {
        name_en: "Czech Republic",
        iso2: "CZ",
      },
      {
        name_en: "Denmark",
        iso2: "DK",
      },
      {
        name_en: "Djibouti",
        iso2: "DJ",
      },
      {
        name_en: "Dominica",
        iso2: "DM",
      },
      {
        name_en: "Dominican Republic",
        iso2: "DO",
      },
      {
        name_en: "Ecuador",
        iso2: "EC",
      },
      {
        name_en: "Egypt",
        iso2: "EG",
      },
      {
        name_en: "El Salvador",
        iso2: "SV",
      },
      {
        name_en: "Equatorial Guinea",
        iso2: "GQ",
      },
      {
        name_en: "Eritrea",
        iso2: "ER",
      },
      {
        name_en: "Estonia",
        iso2: "EE",
      },
      {
        name_en: "Ethiopia",
        iso2: "ET",
      },
      {
        name_en: "Falkland Islands (Malvinas)",
        iso2: "FK",
      },
      {
        name_en: "Faroe Islands",
        iso2: "FO",
      },
      {
        name_en: "Fiji",
        iso2: "FJ",
      },
      {
        name_en: "Finland",
        iso2: "FI",
      },
      {
        name_en: "France",
        iso2: "FR",
      },
      {
        name_en: "French Guiana",
        iso2: "GF",
      },
      {
        name_en: "French Polynesia",
        iso2: "PF",
      },
      {
        name_en: "French Southern Territories",
        iso2: "TF",
      },
      {
        name_en: "Gabon",
        iso2: "GA",
      },
      {
        name_en: "Gambia",
        iso2: "GM",
      },
      {
        name_en: "Georgia",
        iso2: "GE",
      },
      {
        name_en: "Germany",
        iso2: "DE",
      },
      {
        name_en: "Ghana",
        iso2: "GH",
      },
      {
        name_en: "Gibraltar",
        iso2: "GI",
      },
      {
        name_en: "Greece",
        iso2: "GR",
      },
      {
        name_en: "Greenland",
        iso2: "GL",
      },
      {
        name_en: "Grenada",
        iso2: "GD",
      },
      {
        name_en: "Guadeloupe",
        iso2: "GP",
      },
      {
        name_en: "Guam",
        iso2: "GU",
      },
      {
        name_en: "Guatemala",
        iso2: "GT",
      },
      {
        name_en: "Guinea",
        iso2: "GN",
      },
      {
        name_en: "Guinea-Bissau",
        iso2: "GW",
      },
      {
        name_en: "Guyana",
        iso2: "GY",
      },
      {
        name_en: "Haiti",
        iso2: "HT",
      },
      {
        name_en: "Heard Island and Mcdonald Islands",
        iso2: "HM",
      },
      {
        name_en: "Holy See (Vatican City State)",
        iso2: "VA",
      },
      {
        name_en: "Honduras",
        iso2: "HN",
      },
      {
        name_en: "Hong Kong",
        iso2: "HK",
      },
      {
        name_en: "Hungary",
        iso2: "HU",
      },
      {
        name_en: "Iceland",
        iso2: "IS",
      },
      {
        name_en: "India",
        iso2: "IN",
      },
      {
        name_en: "Indonesia",
        iso2: "ID",
      },
      {
        name_en: "Iran, Islamic Republic of",
        iso2: "IR",
      },
      {
        name_en: "Iraq",
        iso2: "IQ",
      },
      {
        name_en: "Ireland",
        iso2: "IE",
      },
      {
        name_en: "Israel",
        iso2: "IL",
      },
      {
        name_en: "Italy",
        iso2: "IT",
      },
      {
        name_en: "Jamaica",
        iso2: "JM",
      },
      {
        name_en: "Japan",
        iso2: "JP",
      },
      {
        name_en: "Jordan",
        iso2: "JO",
      },
      {
        name_en: "Kazakhstan",
        iso2: "KZ",
      },
      {
        name_en: "Kenya",
        iso2: "KE",
      },
      {
        name_en: "Kiribati",
        iso2: "KI",
      },
      {
        name_en: "Korea",
        iso2: "KP",
      },
      {
        name_en: "Korea, Republic of",
        iso2: "KR",
      },
      {
        name_en: "Kuwait",
        iso2: "KW",
      },
      {
        name_en: "Kyrgyzstan",
        iso2: "KG",
      },
      {
        name_en: "Lao People Democratic Republic",
        iso2: "LA",
      },
      {
        name_en: "Latvia",
        iso2: "LV",
      },
      {
        name_en: "Lebanon",
        iso2: "LB",
      },
      {
        name_en: "Lesotho",
        iso2: "LS",
      },
      {
        name_en: "Liberia",
        iso2: "LR",
      },
      {
        name_en: "Libyan Arab Jamahiriya",
        iso2: "LY",
      },
      {
        name_en: "Liechtenstein",
        iso2: "LI",
      },
      {
        name_en: "Lithuania",
        iso2: "LT",
      },
      {
        name_en: "Luxembourg",
        iso2: "LU",
      },
      {
        name_en: "Macao",
        iso2: "MO",
      },
      {
        name_en: "Macedonia, the Former Yugoslav Republic of",
        iso2: "MK",
      },
      {
        name_en: "Madagascar",
        iso2: "MG",
      },
      {
        name_en: "Malawi",
        iso2: "MW",
      },
      {
        name_en: "Malaysia",
        iso2: "MY",
      },
      {
        name_en: "Maldives",
        iso2: "MV",
      },
      {
        name_en: "Mali",
        iso2: "ML",
      },
      {
        name_en: "Malta",
        iso2: "MT",
      },
      {
        name_en: "Marshall Islands",
        iso2: "MH",
      },
      {
        name_en: "Martinique",
        iso2: "MQ",
      },
      {
        name_en: "Mauritania",
        iso2: "MR",
      },
      {
        name_en: "Mauritius",
        iso2: "MU",
      },
      {
        name_en: "Mayotte",
        iso2: "YT",
      },
      {
        name_en: "Mexico",
        iso2: "MX",
      },
      {
        name_en: "Micronesia, Federated States of",
        iso2: "FM",
      },
      {
        name_en: "Moldova, Republic of",
        iso2: "MD",
      },
      {
        name_en: "Monaco",
        iso2: "MC",
      },
      {
        name_en: "Mongolia",
        iso2: "MN",
      },
      {
        name_en: "Montserrat",
        iso2: "MS",
      },
      {
        name_en: "Morocco",
        iso2: "MA",
      },
      {
        name_en: "Mozambique",
        iso2: "MZ",
      },
      {
        name_en: "Myanmar",
        iso2: "MM",
      },
      {
        name_en: "Namibia",
        iso2: "NA",
      },
      {
        name_en: "Nauru",
        iso2: "NR",
      },
      {
        name_en: "Nepal",
        iso2: "NP",
      },
      {
        name_en: "Netherlands",
        iso2: "NL",
      },
      {
        name_en: "Netherlands Antilles",
        iso2: "AN",
      },
      {
        name_en: "New Caledonia",
        iso2: "NC",
      },
      {
        name_en: "New Zealand",
        iso2: "NZ",
      },
      {
        name_en: "Nicaragua",
        iso2: "NI",
      },
      {
        name_en: "Niger",
        iso2: "NE",
      },
      {
        name_en: "Nigeria",
        iso2: "NG",
      },
      {
        name_en: "Niue",
        iso2: "NU",
      },
      {
        name_en: "Norfolk Island",
        iso2: "NF",
      },
      {
        name_en: "Northern Mariana Islands",
        iso2: "MP",
      },
      {
        name_en: "Norway",
        iso2: "NO",
      },
      {
        name_en: "Oman",
        iso2: "OM",
      },
      {
        name_en: "Pakistan",
        iso2: "PK",
      },
      {
        name_en: "Palau",
        iso2: "PW",
      },
      {
        name_en: "Palestinian Territory, Occupied",
        iso2: "PS",
      },
      {
        name_en: "Panama",
        iso2: "PA",
      },
      {
        name_en: "Papua New Guinea",
        iso2: "PG",
      },
      {
        name_en: "Paraguay",
        iso2: "PY",
      },
      {
        name_en: "Peru",
        iso2: "PE",
      },
      {
        name_en: "Philippines",
        iso2: "PH",
      },
      {
        name_en: "Pitcairn",
        iso2: "PN",
      },
      {
        name_en: "Poland",
        iso2: "PL",
      },
      {
        name_en: "Portugal",
        iso2: "PT",
      },
      {
        name_en: "Puerto Rico",
        iso2: "PR",
      },
      {
        name_en: "Qatar",
        iso2: "QA",
      },
      {
        name_en: "Reunion",
        iso2: "RE",
      },
      {
        name_en: "Romania",
        iso2: "RO",
      },
      {
        name_en: "Russian Federation",
        iso2: "RU",
      },
      {
        name_en: "Rwanda",
        iso2: "RW",
      },
      {
        name_en: "Saint Helena",
        iso2: "SH",
      },
      {
        name_en: "Saint Kitts and Nevis",
        iso2: "KN",
      },
      {
        name_en: "Saint Lucia",
        iso2: "LC",
      },
      {
        name_en: "Saint Pierre and Miquelon",
        iso2: "PM",
      },
      {
        name_en: "Saint Vincent and the Grenadines",
        iso2: "VC",
      },
      {
        name_en: "Samoa",
        iso2: "WS",
      },
      {
        name_en: "San Marino",
        iso2: "SM",
      },
      {
        name_en: "Sao Tome and Principe",
        iso2: "ST",
      },
      {
        name_en: "Saudi Arabia",
        iso2: "SA",
      },
      {
        name_en: "Senegal",
        iso2: "SN",
      },
      {
        name_en: "Serbia and Montenegro",
        iso2: "CS",
      },
      {
        name_en: "Seychelles",
        iso2: "SC",
      },
      {
        name_en: "Sierra Leone",
        iso2: "SL",
      },
      {
        name_en: "Singapore",
        iso2: "SG",
      },
      {
        name_en: "Slovakia",
        iso2: "SK",
      },
      {
        name_en: "Slovenia",
        iso2: "SI",
      },
      {
        name_en: "Solomon Islands",
        iso2: "SB",
      },
      {
        name_en: "Somalia",
        iso2: "SO",
      },
      {
        name_en: "South Africa",
        iso2: "ZA",
      },
      {
        name_en: "South Georgia and the South Sandwich Islands",
        iso2: "GS",
      },
      {
        name_en: "Spain",
        iso2: "ES",
      },
      {
        name_en: "Sri Lanka",
        iso2: "LK",
      },
      {
        name_en: "Sudan",
        iso2: "SD",
      },
      {
        name_en: "Suriname",
        iso2: "SR",
      },
      {
        name_en: "Svalbard and Jan Mayen",
        iso2: "SJ",
      },
      {
        name_en: "Swaziland",
        iso2: "SZ",
      },
      {
        name_en: "Sweden",
        iso2: "SE",
      },
      {
        name_en: "Switzerland",
        iso2: "CH",
      },
      {
        name_en: "Syrian Arab Republic",
        iso2: "SY",
      },
      {
        name_en: "Taiwan, Province of China",
        iso2: "TW",
      },
      {
        name_en: "Tajikistan",
        iso2: "TJ",
      },
      {
        name_en: "Tanzania, United Republic of",
        iso2: "TZ",
      },
      {
        name_en: "Thailand",
        iso2: "TH",
      },
      {
        name_en: "Timor-Leste",
        iso2: "TL",
      },
      {
        name_en: "Togo",
        iso2: "TG",
      },
      {
        name_en: "Tokelau",
        iso2: "TK",
      },
      {
        name_en: "Tonga",
        iso2: "TO",
      },
      {
        name_en: "Trinidad and Tobago",
        iso2: "TT",
      },
      {
        name_en: "Tunisia",
        iso2: "TN",
      },
      {
        name_en: "Turkey",
        iso2: "TR",
      },
      {
        name_en: "Turkmenistan",
        iso2: "TM",
      },
      {
        name_en: "Turks and Caicos Islands",
        iso2: "TC",
      },
      {
        name_en: "Tuvalu",
        iso2: "TV",
      },
      {
        name_en: "Uganda",
        iso2: "UG",
      },
      {
        name_en: "Ukraine",
        iso2: "UA",
      },
      {
        name_en: "United Arab Emirates",
        iso2: "AE",
      },
      {
        name_en: "United Kingdom",
        iso2: "GB",
      },
      {
        name_en: "United States",
        iso2: "US",
      },
      {
        name_en: "United States Minor Outlying Islands",
        iso2: "UM",
      },
      {
        name_en: "Uruguay",
        iso2: "UY",
      },
      {
        name_en: "Uzbekistan",
        iso2: "UZ",
      },
      {
        name_en: "Vanuatu",
        iso2: "VU",
      },
      {
        name_en: "Venezuela",
        iso2: "VE",
      },
      {
        name_en: "Viet Nam",
        iso2: "VN",
      },
      {
        name_en: "Virgin Islands, British",
        iso2: "VG",
      },
      {
        name_en: "Virgin Islands, U.s.",
        iso2: "VI",
      },
      {
        name_en: "Wallis and Futuna",
        iso2: "WF",
      },
      {
        name_en: "Western Sahara",
        iso2: "EH",
      },
      {
        name_en: "Yemen",
        iso2: "YE",
      },
      {
        name_en: "Zambia",
        iso2: "ZM",
      },
      {
        name_en: "Zimbabwe",
        iso2: "ZW",
      },
    ],
    active_languages: [
      {
        language_code: "en",
        language_name: "English",
        language_default: "yes",
      },
      {
        language_code: "fa",
        language_name: "Persian",
        language_default: "no",
      },
      {
        language_code: "ar",
        language_name: "Arabic",
        language_default: "no",
      },
      {
        language_code: "es",
        language_name: "Spanish",
        language_default: "no",
      },
      {
        language_code: "fr",
        language_name: "French",
        language_default: "no",
      },
      {
        language_code: "ko",
        language_name: "Korean",
        language_default: "no",
      },
      {
        language_code: "hi",
        language_name: "Hindi",
        language_default: "no",
      },
      {
        language_code: "it",
        language_name: "Italian",
        language_default: "no",
      },
      {
        language_code: "th",
        language_name: "Thai",
        language_default: "no",
      },
      {
        language_code: "sk",
        language_name: "Slovak",
        language_default: "no",
      },
      {
        language_code: "el",
        language_name: "Greek",
        language_default: "no",
      },
      {
        language_code: "tr",
        language_name: "Turkish",
        language_default: "no",
      },
      {
        language_code: "bg",
        language_name: "Bulgarian",
        language_default: "no",
      },
      {
        language_code: "ur",
        language_name: "Urdu",
        language_default: "no",
      },
      {
        language_code: "pl",
        language_name: "Polish",
        language_default: "no",
      },
      {
        language_code: "pt",
        language_name: "Portuguese",
        language_default: "no",
      },
      {
        language_code: "sv",
        language_name: "Swedish",
        language_default: "no",
      },
      {
        language_code: "ru",
        language_name: "Russian",
        language_default: "no",
      },
      {
        language_code: "de",
        language_name: "German",
        language_default: "no",
      },
      {
        language_code: "fa",
        language_name: "Persian",
        language_default: "no",
      },
      {
        language_code: "ar",
        language_name: "Arabic",
        language_default: "no",
      },
      {
        language_code: "es",
        language_name: "Spanish",
        language_default: "no",
      },
      {
        language_code: "fr",
        language_name: "French",
        language_default: "no",
      },
      {
        language_code: "ko",
        language_name: "Korean",
        language_default: "no",
      },
      {
        language_code: "hi",
        language_name: "Hindi",
        language_default: "no",
      },
      {
        language_code: "it",
        language_name: "Italian",
        language_default: "no",
      },
      {
        language_code: "th",
        language_name: "Thai",
        language_default: "no",
      },
      {
        language_code: "sk",
        language_name: "Slovak",
        language_default: "no",
      },
      {
        language_code: "el",
        language_name: "Greek",
        language_default: "no",
      },
      {
        language_code: "tr",
        language_name: "Turkish",
        language_default: "no",
      },
      {
        language_code: "bg",
        language_name: "Bulgarian",
        language_default: "no",
      },
      {
        language_code: "ur",
        language_name: "Urdu",
        language_default: "no",
      },
      {
        language_code: "pl",
        language_name: "Polish",
        language_default: "no",
      },
      {
        language_code: "pt",
        language_name: "Portuguese",
        language_default: "no",
      },
      {
        language_code: "sv",
        language_name: "Swedish",
        language_default: "no",
      },
      {
        language_code: "ru",
        language_name: "Russian",
        language_default: "no",
      },
      {
        language_code: "de",
        language_name: "German",
        language_default: "no",
      },
    ],
    app_logo: "https://deikho.com/images/logo.png",
    elastic_search: "yes",
    pages: [
      {
        page_id: 1,
        page_name: "about_us",
        page_title: "About us",
        page_content:
          '<div style="margin: auto; width: 98%;"><p class="MsoNormal" style="text-align:justify">Deikho is a VOD platform airing\r\nexclusive content at extremely reasonable rates. We stand for exposing our audience\r\nto quality local content to promote our local talent as well as showcasing\r\nmeaningful and entertaining content.Mission To host the best locally produced\r\ncontent and be the best VOD service provider nationally.<o:p></o:p></p><p class="MsoNormal" style="text-align:justify"><span style="font-weight: bold;">Vision</span></p><p class="MsoNormal" style="text-align:justify">To become an international VOD\r\nservice provider helping locally produced content\r\ngain mileage on a global level.</p><p class="MsoNormal" style="text-align:justify"><span style="font-weight: bold;">Values</span><o:p></o:p></p><p class="MsoNormal" style="text-align:justify">What s sets us apart from the\r\nrest is the element of exclusivity and originality.<o:p></o:p></p><p class="MsoNormal" style="text-align:justify"><o:p></o:p></p></div>',
      },
      {
        page_id: 3,
        page_name: "terms_of_service",
        page_title: "Terms of Service",
        page_content: "Write your own terms of service...",
      },
      {
        page_id: 4,
        page_name: "help",
        page_title: "Help",
        page_content:
          '<span style="font-weight: bold;">How to use Deikho</span><br><ol><li>Articles will be written pretty soon</li></ol>',
      },
      {
        page_id: 7,
        page_name: "contact Us",
        page_title: "Contact Us",
        page_content: "<p><br></p>",
      },
    ],
    vid_categories: [],
    country_block: "no",
    paidConfigs: {
      currency: "USD",
      test_mode: "enabled",
      paypal_email: "my@paypal.com",
      paypal_sandbox_email: "sandbox@paypal.com",
      license_key: "CBPAIDMODXXXXXX",
      license_local_key: "",
      premium_type: "selected",
      premium_videos: "0",
      allow_demo: "3.0",
      show_prem_icon: "yes",
      alertpay_code: "yes",
      alertpay_email: "yes",
      use_alertpay: "yes",
      use_directpay: "yes",
      directpay_company_token: "",
      directpay_service_type: "",
      directpay_service_name: "",
      notify_on_sub: "yes",
      notify_on_payment: "yes",
      email_notification: "yes",
      use_first_data: "yes",
      fd_api_login: "XXX",
      fd_api_key: "XXX123",
      fd_store_id: "XXX456",
      fd_shared_secret: "XXX",
      pay_to_text: "Your pay_to Text",
      fd_currency: "840",
      paypal_client_id:
        "AWFF4AUcHLZDLAOpfUo8f0VoJ8VkN3uXhwwrDpBoHV7ow4ojM5A-bY-JA4zf1TAwrf_DxHyr_u5wFzt5",
      paypal_secret:
        "EA2Q8W_fQottezQl0dA1vya8zJbzGbqMeLlI-MqTEhJWmekA6AEA8XixzMth0VvcgaXXJQ1orMF59QrH",
      return_url: "https://confidence.vodlix.com/payment",
      cancle_url: "https://confidence.vodlix.com/payment/failed",
      paypal_rest_api: "yes",
      use_stripe: "no",
      stripe_email: "my@stripe.com",
      stripe_secret: "123",
      use_pay_pal: "yes",
      use_2co: "yes",
      mins_allow_type: "each",
      "2co_vendor_id": "123465789",
      allow_user_set_premium: "yes",
    },
  };

  //res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ configs });
});

module.exports = userRouter;
