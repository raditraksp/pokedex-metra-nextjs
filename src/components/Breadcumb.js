import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { CapitalizeAfterSpace } from "@/libs/helper/globalFunc";

const CollapsedBreadcrumbs = () => {
  const router = useRouter();
  const [paths, setPaths] = useState();

  useEffect(() => {
    const myPaths = router?.asPath?.split("/");
    setPaths(myPaths);
    return () => {};
  }, [router]);

  console.log(paths);
  console.log(router?.asPath)

  return (
    <div
      style={{
        margin: "16px 0",
      }}
    >
      <Breadcrumb
        items={
          paths &&
          paths.map((path, i) => {
            return {
              title: path === "" ? "Dashboard" : CapitalizeAfterSpace(path?.replaceAll("-", " ")),
            };
          })
        }
      />
    </div>
  );
};

export default CollapsedBreadcrumbs;
