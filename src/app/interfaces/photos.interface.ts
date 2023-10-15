export interface SearchRequest {
  results?: Photo[];
  total: number;
  total_pages?: number;
}

export interface Photo {
  id: string;
  saved?: boolean;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  promoted_at?: string;
  width?: number;
  height?: number;
  color?: string;
  blur_hash?: string;
  description?: string | null;
  alt_description?: string;
  breadcrumbs?: any[];
  urls?: Urls;
  links?: PhotoLinks;
  likes?: number;
  liked_by_user?: boolean;
  current_user_collections?: any[];
  sponsorship?: null;
  topic_submissions?: TopicSubmissions;
  user?: User;
  tags?: Tag[];
}

export interface PhotoLinks {
  self?: string;
  html?: string;
  download?: string;
  download_location?: string;
}

export interface Tag {
  type?: string;
  title?: string;
  source?: Source;
}

export interface Source {
  ancestry?: Ancestry;
  title?: string;
  subtitle?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  cover_photo?: CoverPhoto;
}

export interface Ancestry {
  type?: Category;
  category?: Category;
  subcategory?: Category;
}

export interface Category {
  slug?: string;
  pretty_slug?: string;
}

export interface CoverPhoto {
  id?: string;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  promoted_at?: string;
  width?: number;
  height?: number;
  color?: string;
  blur_hash?: string;
  description?: string;
  alt_description?: string;
  breadcrumbs?: any[];
  urls?: Urls;
  links?: PhotoLinks;
  likes?: number;
  liked_by_user?: boolean;
  current_user_collections?: any[];
  sponsorship?: null;
  topic_submissions?: CoverPhotoTopicSubmissions;
  premium?: boolean;
  plus?: boolean;
  user?: User;
}

export interface CoverPhotoTopicSubmissions {
  wallpapers?: BusinessWork;
}

export interface BusinessWork {
  status?: string;
  approved_on?: string;
}

export interface Urls {
  raw?: string;
  full?: string;
  regular?: string;
  small?: string;
  thumb?: string;
  small_s3?: string;
}

export interface User {
  id?: string;
  updated_at?: string;
  username?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  twitter_username?: null | string;
  portfolio_url?: string | null;
  bio?: string;
  location?: string;
  links?: UserLinks;
  profile_image?: ProfileImage;
  instagram_username?: string;
  total_collections?: number;
  total_likes?: number;
  total_photos?: number;
  accepted_tos?: boolean;
  for_hire?: boolean;
  social?: Social;
}

export interface UserLinks {
  self?: string;
  html?: string;
  photos?: string;
  likes?: string;
  portfolio?: string;
  following?: string;
  followers?: string;
}

export interface ProfileImage {
  small?: string;
  medium?: string;
  large?: string;
}

export interface Social {
  instagram_username?: string;
  portfolio_url?: string | null;
  twitter_username?: null | string;
  paypal_email?: null;
}

export interface PhotoTopicSubmissions {
  'business-work'?: BusinessWork;
}

export interface TopicSubmissions {
  technology: Technology;
}
export interface Technology {
  status: string;
  approved_on: string;
}
