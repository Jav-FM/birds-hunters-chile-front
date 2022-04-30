import React from "react";
import "./About.scss";
import { HeaderWithPhotos } from "../../components/HeaderWithPhotos";
import { useSelector} from "react-redux";
import { LoadingScreen } from "../../components/LoadingScreen";


const About = () => {
  const loading = useSelector((state) => state.loading.loading);


  return (
    <React.Fragment>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div id="about" className="d-flex flex-column align-items-center">
          <HeaderWithPhotos title="Sobre Birds Hunters" />

          <div className="container my-5">
            <p className="info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              gravida leo quam, non vestibulum enim mollis sed. Pellentesque
              bibendum purus eget libero maximus, vel ultricies augue faucibus.
              Duis sit amet scelerisque eros. Vivamus maximus mi eu hendrerit
              porttitor. Suspendisse gravida viverra nulla, quis eleifend urna
              consectetur eu. Vivamus a elit vel dui tristique ultrices. Morbi
              tincidunt tempus quam at aliquam. Praesent nec ipsum et nulla
              fermentum viverra. Pellentesque habitant morbi tristique senectus
              et netus et malesuada fames ac turpis egestas. Etiam convallis,
              turpis at ornare aliquam, libero elit fringilla magna, malesuada
              interdum lorem nibh non ligula. Praesent at massa in sem sagittis
              pretium. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Nullam non velit non nisi
              venenatis scelerisque. Sed id fermentum lectus. Pellentesque
              imperdiet tincidunt magna eget ultricies. Integer non turpis vitae
              nulla mollis pharetra. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Integer
              dictum neque euismod neque viverra, non dictum ex euismod. Sed
              semper, enim in sodales laoreet, lorem lorem sollicitudin lacus,
              sed imperdiet magna nibh vel magna. Aliquam eu efficitur lacus.
            </p>
            <p className="info">
              Nulla eu diam ac libero placerat euismod ut a odio. Duis dictum
              urna congue pulvinar dignissim. Vestibulum feugiat ultricies neque
              non rhoncus. Aenean turpis diam, pharetra et porta non, vestibulum
              at arcu. Nullam tempor suscipit leo, at convallis augue semper
              tristique. Etiam blandit tortor nulla. Cras sit amet ornare
              ligula, quis efficitur metus. Nulla consequat massa sit amet ante
              mollis vehicula non et diam. Aenean gravida hendrerit nisl, eget
              interdum nisl gravida in. Sed in malesuada sapien, vel pretium
              massa. Nam nulla ipsum, porttitor non gravida imperdiet,
              vestibulum maximus diam. Cras nec urna euismod, elementum quam sit
              amet, ornare nibh. Interdum et malesuada fames ac ante ipsum
              primis in faucibus. Quisque semper suscipit felis, imperdiet
              gravida odio ultricies quis. Nam imperdiet lorem libero, faucibus
              maximus eros blandit eget. Morbi nec mollis justo, vel sodales
              lectus. Ut egestas vitae quam molestie elementum. Maecenas pretium
              eu augue ut vulputate. Nam ipsum felis, maximus quis facilisis ut,
              convallis vel eros. Nulla viverra, elit sit amet sagittis
              vestibulum, nulla odio tempor felis, vitae finibus purus metus at
              justo. Phasellus ultricies justo ut tincidunt mattis. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Ut vitae justo at tortor pellentesque pharetra
              quis vitae eros. Vestibulum non egestas metus, eu congue ligula.
              Fusce ligula velit, molestie ut dolor ut, volutpat semper quam.
            </p>
            <p className="info">
              Pellentesque purus elit, ultricies vel ultricies sit amet,
              facilisis egestas nibh. Sed ac maximus lorem, non gravida lorem.
              Nulla id consequat sapien. Quisque consequat efficitur lacus, id
              dignissim felis. In hac habitasse platea dictumst. Duis vel
              pulvinar augue. Cras non enim non sem vestibulum aliquam tempus id
              enim. Pellentesque rhoncus diam placerat leo feugiat aliquam.
              Proin sed vulputate sapien. Maecenas sodales consequat ornare.
              Phasellus congue porta odio id condimentum. Nam egestas augue eu
              lectus tincidunt iaculis vitae eu elit. Donec sodales facilisis
              sagittis. Duis at lacus leo. Nunc vestibulum velit id dolor
              facilisis convallis. Ut et lacinia massa, ut ornare nulla. Donec
              varius mauris nec orci interdum sollicitudin. Nullam leo ipsum,
              commodo eget orci sed, vestibulum ultrices dui.
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export { About };
