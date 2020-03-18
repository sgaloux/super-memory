import { all, takeEvery, fork, select, put, delay } from "redux-saga/effects";
import {
  showCard,
  pairCards,
  CardInfo,
  markError,
  hideCards,
  initialize,
  gameSelectors
} from "./gameReducer";
import { showSuccess, showInfo } from "../components/NotificationToast";

function* watchFlip() {
  yield takeEvery(showCard.type, function* onFlipActionTaken(
    action: ReturnType<typeof showCard>
  ) {
    const visibleCards: CardInfo[] = yield select(gameSelectors.visibleCards);

    if (visibleCards.length === 2) {
      if (visibleCards[0].image === visibleCards[1].image) {
        yield put(pairCards(visibleCards));
      } else {
        yield put(markError(visibleCards));
        yield delay(1000);
        yield put(hideCards(visibleCards));
      }
    }
  });
}

function* watchInit() {
  yield takeEvery(initialize.type, function onInitialize() {
    showInfo("New game started");
  });
}

const rootSaga = function*() {
  yield all([fork(watchFlip), fork(watchInit)]);
};

export default rootSaga;
