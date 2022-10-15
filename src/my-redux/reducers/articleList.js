export const articleListActions = {
  ARTICLE_FAVORITED: "ARTICLE_FAVORITED",
  ARTICLE_UNFAVORITED: "ARTICLE_UNFAVORITED",
  SET_PAGE: "SET_PAGE",
  APPLY_TAG_FILTER: "APPLY_TAG_FILTER",
  HOME_PAGE_LOADED: "HOME_PAGE_LOADED",
  HOME_PAGE_UNLOADED: "HOME_PAGE_UNLOADED",
  CHANGE_TAB: "CHANGE_TAB",
  PROFILE_PAGE_LOADED: "PROFILE_PAGE_LOADED",
  PROFILE_PAGE_UNLOADED: "PROFILE_PAGE_UNLOADED",
  PROFILE_FAVORITES_PAGE_LOADED: "PROFILE_FAVORITES_PAGE_LOADED",
  PROFILE_FAVORITES_PAGE_UNLOADED: "PROFILE_FAVORITES_PAGE_UNLOADED",
};

export const articleList = (state = {}, action) => {
  switch (action.type) {
    case articleListActions.ARTICLE_FAVORITED:
    case articleListActions.ARTICLE_UNFAVORITED:
      return {
        ...state,
        articles: state.articles.map((article) => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount,
            };
          }
          return article;
        }),
      };
    case articleListActions.SET_PAGE:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page,
      };
    case articleListActions.APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0,
      };
    case articleListActions.HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0].tags,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0,
        tab: action.tab,
      };
    case articleListActions.HOME_PAGE_UNLOADED:
      return {};
    case articleListActions.CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        currentPage: 0,
        tag: null,
      };
    case articleListActions.PROFILE_PAGE_LOADED:
    case articleListActions.PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0,
      };
    case articleListActions.PROFILE_PAGE_UNLOADED:
    case articleListActions.PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
