import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

export function usePaginate({ nextKey }: { nextKey: object | undefined }) {
  //get the pathname
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [prevSearch, setPrevSearch] = useState<object[]>(function () {
    //get the history from the search params
    const prevSearch = searchParams.get("history");

    return prevSearch ? JSON.parse(decodeURIComponent(prevSearch)) : [];
  });

  function handleNext() {
    if (!nextKey) return;

    setPrevSearch((current) => [...current, nextKey]);

    const setParams = new URLSearchParams();

    setParams.set("query", encodeURIComponent(JSON.stringify(nextKey)));

    setParams.set(
      "history",
      encodeURIComponent(JSON.stringify([...prevSearch, nextKey])),
    );

    replace(`${pathname}?${setParams.toString()}`);
  }

  function handlePrevious() {
    if (!prevSearch.length) return;

    const setParams = new URLSearchParams();

    //go back 1 item from the last item
    const queryString = prevSearch[prevSearch.length - 1 - 1];

    setParams.set("query", encodeURIComponent(JSON.stringify(queryString)));

    //remove the last item from the array
    setPrevSearch((current) => current.slice(0, current.length - 1));

    //if there is a query string,
    if (queryString) {
      replace(`${pathname}?${setParams.toString()}`);

      setParams.set(
        "history",
        encodeURIComponent(
          JSON.stringify([...prevSearch.slice(0, prevSearch.length - 1)]),
        ),
      );

      return;
    }

    setParams.set(
      "history",
      encodeURIComponent(
        JSON.stringify([...prevSearch.slice(0, prevSearch.length - 1)]),
      ),
    );

    replace(`${pathname}`);
  }

  return {
    prevSearch,
    handleNext,
    setPrevSearch,
    handlePrevious,
  };
}
