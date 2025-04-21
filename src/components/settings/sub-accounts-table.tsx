import { useState, useEffect, useRef, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";
import { useUserContext } from "@/app/context/UserContext";
import DefaultUser from "@/images/user-placeholder.jpg";
import { EllipsisVertical, PlusCircle, Upload } from "lucide-react";

import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import SubAccountEdit from "./sub-account-edit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubAccountDelete from "./sub-account-delete";
import AddSubAccountDialog from "../layout/add-sub-account-dialog";
import SubAccountProfile from "@/images/user-placeholder.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SpinnerIcon from "@/images/Spinner";
import { Select, SelectContent, SelectTrigger } from "../ui/select";
import { RelationshipSelect } from "@/lib/utils";
import { SelectItem } from "@radix-ui/react-select";
import { SubAccountData } from "@/lib/data/sub-accounts";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SubAccountsTable() {
  const { sessionkey, setUserDetails } = useUserContext();
  const sub_accounts = SubAccountData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/sub-accounts/`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 || response.status === 201) {
          setUserDetails({
            sub_accounts: response.data,
          });
        }
      } catch (error) {}
    };
    fetchData();
  }, [sub_accounts]);

  const authHeader = "Token " + sessionkey; // Basic Authentication header

  const [openEditIndex, setOpenEditIndex] = useState<number | null>(null); // Only track which row is open for editing
  const [openDeleteIndex, setOpenDeleteIndex] = useState<number | null>(null); // Only track which row is open for editing
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [bday, setBday] = useState("");
  const [relationship, setRelationship] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const profile_image =
    openEditIndex !== null &&
    openEditIndex !== undefined &&
    sub_accounts[openEditIndex]
      ? sub_accounts[openEditIndex].profile_picture
      : null;

  const [uploadedImage, setUploadedImage] = useState<string | null | File>(
    profile_image
  );

  useEffect(() => {
    if (sub_accounts && sub_accounts.length > 0 && openEditIndex !== null) {
      setFName(sub_accounts[openEditIndex].first_name);
      setLName(sub_accounts[openEditIndex].last_name);
      setBday(sub_accounts[openEditIndex].birth_date);
      setRelationship(
        sub_accounts[openEditIndex].relationship || ""
      );
    }
  }, [sub_accounts, openEditIndex]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const imageSrc = uploadedImage
    ? typeof uploadedImage === "string"
      ? uploadedImage
      : URL.createObjectURL(uploadedImage)
    : profile_image || DefaultUser;

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so +1
    return `${year}-${month}-${day}`;
  };

  const [originalData, setOriginalData] = useState({
    fname: "",
    lname: "",
    bday: "",
    relationship: null,
    profile_image: "",
    uploadedImage: null as string | null,
  });

  const handleUpdateSubAccount = async (index: number) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpenEditIndex(null); // Close the dialog after saving
    }, 1000);
    setTimeout(() => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Success</DialogTitle>
          <p>Details for sub-account updated successfully.</p>
        </DialogContent>
      </Dialog>
      <div className="w-full p-2 flex justify-end">
        <div className="flex justify-center items-center border gap-2 border-[#2E5257] cursor-pointer rounded-full  p-3">
          <PlusCircle stroke="#2E5257" strokeWidth={1} size={20}></PlusCircle>
          <AddSubAccountDialog></AddSubAccountDialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="gen-text-sm">
            <TableHead className="text-center">Picture</TableHead>
            <TableHead className="text-center">Firstname</TableHead>
            <TableHead className="text-center">Lastname</TableHead>
            <TableHead className="text-center">Birthdate</TableHead>
            <TableHead className="text-center">Relationship</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sub_accounts.map((item, index) => (
            <TableRow className="gen-text-sm" key={index}>
              <TableCell className="flex justify-center items-center">
                <div className="rounded-full">
                  <Image
                    src={item.profile_picture || DefaultUser}
                    alt="account-img"
                    width={300}
                    height={300}
                    className="rounded-full w-[50px] h-[50px]"
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">
                {item.first_name}
              </TableCell>
              <TableCell className="text-center">
                {item.last_name}
              </TableCell>
              <TableCell className="text-center">
                {item.birth_date}
              </TableCell>
              <TableCell className="text-center capitalize">
                {item.relationship}
              </TableCell>
              <TableCell className="text-center">
                <Menubar className="w-auto">
                  <MenubarMenu>
                    <MenubarTrigger className="flex justify-center items-center w-full">
                      <EllipsisVertical />
                    </MenubarTrigger>
                    <MenubarContent className="w-auto">
                      <Button
                        className="w-full text-left flex justify-start"
                        variant="ghost"
                        onClick={() => setOpenEditIndex(index)} // Set the index for editing
                      >
                        Edit
                      </Button>
                      <Button
                        className="w-full text-left flex justify-start"
                        variant="ghost"
                        onClick={() => setOpenDeleteIndex(index)} // Set the index for editing
                      >
                        Delete
                      </Button>
                    </MenubarContent>

                    {/* Only open the SubAccountEdit modal for the row being edited */}
                    {openEditIndex === index && (
                      <Dialog
                        open={true}
                        onOpenChange={(open) => {
                          if (!open) {
                            // Reset back to original values if user cancels or closes dialog
                            setFName(originalData.fname);
                            setLName(originalData.lname);
                            setBday(originalData.bday);
                            setRelationship(originalData.relationship || "");
                            setUploadedImage(originalData.uploadedImage);
                            setOpenEditIndex(null);
                          } else {
                            setOpenEditIndex(index);
                          }
                        }}
                      >
                        <DialogContent>
                          <DialogTitle>Update Sub-account details</DialogTitle>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                                <Image
                                  src={imageSrc}
                                  alt="user-img"
                                  width={70}
                                  height={70}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="gen-text-l">
                                  {uploadedImage
                                    ? "PROFILE PICTURE"
                                    : "PROFILE PICTURE"}
                                </p>
                                <span className="text-xs text-muted-foreground gen-text-sm">
                                  PNG, JPG, and SVG are accepted
                                </span>
                              </div>
                            </div>
                            <Button
                              onClick={() => imageInputRef.current?.click()}
                              className="bg-[#c4ad93] hover:bg-[#dfbd96] flex items-center text-sm rounded-3xl text-black/70 font-normal py-1"
                            >
                              <Upload strokeWidth={1.3} size={20} />
                              Upload
                            </Button>
                            <Input
                              onChange={handleImageUpload}
                              ref={imageInputRef}
                              className="hidden"
                              type="file"
                              id="profile_picture"
                            />
                          </div>
                          <div className="flex w-full gap-2 justify-between">
                            <div>
                              <Label>Firstname</Label>
                              <Input
                                onChange={(e) => setFName(e.target.value)}
                                value={fname}
                              ></Input>
                            </div>
                            <div>
                              <Label>Lastname</Label>
                              <Input
                                onChange={(e) => setLName(e.target.value)}
                                value={lname}
                              ></Input>
                            </div>
                          </div>
                          <div className="flex w-full gap-7 mt-5 justify-between">
                            <div className=" w-full">
                              <Label>Birthdate</Label>
                              <Input
                                value={bday}
                                onChange={(e) =>
                                  setBday(formatDate(e.target.value))
                                }
                                type="date"
                                className="h-12"
                              ></Input>
                            </div>
                            <div className=" w-full">
                              <Label>Relationship</Label>
                              <Select
                                value={relationship}
                                onValueChange={(e) => setRelationship(e)}
                              >
                                <SelectTrigger className="rounded-xl h-12">
                                  <p className="w-full text-left capitalize">
                                    {relationship}
                                  </p>
                                </SelectTrigger>
                                <SelectContent>
                                  {RelationshipSelect.map((item) => (
                                    <SelectItem
                                      value={item.value}
                                      className="hover:bg-gray-100 p-2 rounded-md"
                                    >
                                      <p>{item.name}</p>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="w-full flex gap-4 mt-10 justify-center items-center">
                            <Button
                              onClick={() => setOpenEditIndex(null)}
                              className="border rounded-full w-[150px]"
                              variant="ghost"
                            >
                              Cancel
                            </Button>
                            <Button
                              className="rounded-full w-[150px]"
                              onClick={() => handleUpdateSubAccount(index)}
                            >
                              {loading ? (
                                <>
                                  <div>
                                    <SpinnerIcon stroke_color="white"></SpinnerIcon>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                              Save
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {openDeleteIndex === index && (
                      <SubAccountDelete
                        sub_account_index={index}
                        open={true}
                        setOpen={(open) =>
                          open
                            ? setOpenDeleteIndex(index)
                            : setOpenDeleteIndex(null)
                        }
                      ></SubAccountDelete>
                    )}
                  </MenubarMenu>
                </Menubar>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
