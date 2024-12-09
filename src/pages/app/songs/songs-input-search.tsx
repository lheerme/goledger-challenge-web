import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../../../components/input";
import { Search } from "lucide-react";
import { useDebounce } from "../../../hooks/use-debounce";
import { useSearchParams } from "react-router-dom";

export function SongsInputSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputSearchValue, setInputSearchValue] = useState(searchParams.get('query') ?? '')
  const debouncedInputSearchValue = useDebounce(inputSearchValue)

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputSearchValue(event.target.value)
  }

  useEffect(() => {
    if (debouncedInputSearchValue) {
      setSearchParams(`?query=${debouncedInputSearchValue}`)
    } else {
      setSearchParams((state) => {
        state.delete('query')
        return state
      })
    }
  }, [debouncedInputSearchValue, setSearchParams])

  return (
    <div className="flex items-center gap-2">
      <Input
        onChange={handleInputChange}
        id="searchInput" 
        type="text"
        value={inputSearchValue}
      />
      <label htmlFor="searchInput">
        <Search className="size-5" />
      </label>
    </div>
  )
}