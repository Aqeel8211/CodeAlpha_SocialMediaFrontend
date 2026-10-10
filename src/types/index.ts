// ============================================
// Auth Types
// ============================================

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: number;
  username: string;
  email: string;
  token: string;
}

// ============================================
// User Types
// ============================================

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  profilePictureUrl: string | null;
  createdAt: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowedByCurrentUser: boolean;
}

export interface UpdateProfileRequest {
  bio?: string | null;
  profilePictureUrl?: string | null;
}

export interface UserSearchResult {
  id: number;
  username: string;
  profilePictureUrl: string | null;
  bio: string | null;
}

// ============================================
// Post Types
// ============================================

export interface Post {
  id: number;
  userId: number;
  username: string;
  profilePictureUrl: string | null;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLikedByCurrentUser: boolean;
}

export interface CreatePostRequest {
  content: string;
  imageUrl?: string | null;
}

export interface UpdatePostRequest {
  content: string;
  imageUrl?: string | null;
}

// ============================================
// Comment Types
// ============================================

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  username: string;
  profilePictureUrl: string | null;
  content: string;
  createdAt: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

// ============================================
// Like Types
// ============================================

export interface LikeCountResponse {
  postId: number;
  likesCount: number;
}

// ============================================
// Follow Types
// ============================================

export interface FollowUser {
  id: number;
  username: string;
  profilePictureUrl: string | null;
  createdAt: string;
}

export interface IsFollowingResponse {
  isFollowing: boolean;
}

// ============================================
// API Error Type
// ============================================

export interface ApiError {
  message: string;
}