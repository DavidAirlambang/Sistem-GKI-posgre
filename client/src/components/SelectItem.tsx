import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE } from "../../../utils/constants";

export function SelectItems({ komisi }: any) {
  const items = Object.values(ROLE).filter((role) => role !== "admin");
  return (
    <Select
      onValueChange={(val) => {
        console.log(val);
      }}
    >
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue
          placeholder={komisi === "admin" ? "Pilih Komisi" : komisi}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {komisi === "admin" ? "Pilih Komisi" : komisi}
          </SelectLabel>
          {komisi === "admin"
            ? items.map((item: any) => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })
            : null}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
