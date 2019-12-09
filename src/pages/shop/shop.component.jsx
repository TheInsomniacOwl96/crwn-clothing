import React from "react";
// import SHOP_DATA from "./shop.data";

import CollectionOverveiw from "../../components/collections-overview/collections-overview.component";

// import CollectionPreview from "../../components/collection-preview/collection-preview.component";

// import { selectCollections } from "../../redux/shop/shop.selectors";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";

// class ShopPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       collections: SHOP_DATA
//     };
//   }

//   render() {
//     const { collections } = this.state;
//     return (
//       <div className="shop-name">
//         {collections.map(({ id, ...otherCollectionProps }) => (
//           <CollectionPreview key={id} {...otherCollectionProps} />
//         ))}
//       </div>
//     );
//   }
// }

/// Converting to function based component
// const ShopPage = ({ match }) => (
//   // <div className="shop-name">
//   //   {collections.map(({ id, ...otherCollectionProps }) => (
//   //     <CollectionPreview key={id} {...otherCollectionProps} />
//   //   ))}
//   // </div>

//   <div className="shop-paage">
//     <Route exact path={`${match.path}`} component={CollectionOverveiw} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

// Converting to class based component
class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const collectionRef = firestore.collection("collections");
    collectionRef.onSnapshot(async snapshot => {
      convertCollectionsSnapshotToMap(snapshot);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-paage">
        <Route exact path={`${match.path}`} component={CollectionOverveiw} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollections
// });

// export default connect(mapStateToProps)(ShopPage);

export default ShopPage;
