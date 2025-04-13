import * as React from "react";
import { CalendarIcon } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useUserContext } from "@/app/context/UserContext";
import SpinnerIcon from "@/images/Spinner";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle } from "../ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const FormSchema = z.object({
  time: z.date({
    required_error: "A date and time is required.",
  }),
});

export function NewBooking() {
  // Save the date as a string in ISO format
  const [date, setDate] = React.useState<string | undefined>();
  const [time, setTime] = React.useState<string | undefined>();
  const [isOpen, setIsOpen] = React.useState(false);
  const [eventName, setEventName] = React.useState("");
  const { sessionkey } = useUserContext();
  const [loading, setLoading] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogOpenFalse, setDialogOpenFalse] = React.useState(false);
  const [participants, setParticipants] = React.useState("");
  const [hoverMax, setHoverMax] = React.useState(false);

  const authHeader = "Token " + sessionkey;
  const formattedTime = time
    ? new Date(time)
        .toLocaleTimeString("en-PH", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Use 24-hour format
        })
        .slice(0, 5)
    : "";

  React.useEffect(() => {
    if (Number(participants) > 10) {
      setHoverMax(true);
    } else {
      setHoverMax(false);
    }
  }, [participants]);

  const finalDateTime = `${date}T${formattedTime}:00.000Z`; // Append the selected time and set the format

  console.log("FINAL: ", finalDateTime);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(`Selected date and time: ${format(data.time, "PPPPpppp")}`);
  }

  function handleDateSelect(date: Date | undefined) {
    if (date) {
      const dateString = date.toISOString().split("T")[0]; // Get the date part (YYYY-MM-DD)
      setDate(dateString); // Store the final formatted date
      form.setValue("time", date); // Keep the form value as a Date object for the calendar component
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues("time") || new Date();
    let newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour); // Directly set the hour without considering AM/PM
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue("time", newDate);
    setTime(String(newDate));
  }
  console.log("PART: ", participants)
  const handleSubmitBooking = async () => {
    setLoading(true);
    if (Number(participants) > 10) {
      setHoverMax(true);
      setLoading(false);
      return;
    }
    if (date && new Date(date) <= new Date()) {
      // If the date is not in the future, return early
      console.log("Please select a date that is in the future.");
      setLoading(false);
      setDialogOpenFalse(true);
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/user/events`,
        {
          event: finalDateTime,
          participants: participants,
        },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );
      setDialogOpen(true);
      console.log("Booked Successfully");
    } catch (error: any) {
      console.log("Full error: ", error);
      const errorDetails = error.response?.data?.detail;
      const statusCode = error.response?.status;
      console.log(errorDetails);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white font-light text-[12px]">
                  Enter your date & time
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"ghost"}
                        className={cn(
                          "w-full pl-3 border border-[#595B5C] text-white text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy HH:mm") // 24-hour format
                        ) : (
                          <span>DD/MM/YYYY HH:mm</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="sm:flex">
                      <Calendar
                        className="w-[300px] h-[350px]"
                        mode="single"
                        selected={field.value}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                      <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {Array.from({ length: 24 }, (_, i) => i).map(
                              (hour) => (
                                <Button
                                  key={hour}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    field.value.getHours() === hour
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() =>
                                    handleTimeChange("hour", hour.toString())
                                  }
                                >
                                  {String(hour).padStart(2, "0")}
                                </Button>
                              )
                            )}
                          </div>
                          <ScrollBar
                            orientation="horizontal"
                            className="sm:hidden"
                          />
                        </ScrollArea>
                        <ScrollArea className="w-64 sm:w-auto">
                          <div className="flex sm:flex-col p-2">
                            {Array.from({ length: 12 }, (_, i) => i * 5).map(
                              (minute) => (
                                <Button
                                  key={minute}
                                  size="icon"
                                  variant={
                                    field.value &&
                                    field.value.getMinutes() === minute
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="sm:w-full shrink-0 aspect-square"
                                  onClick={() =>
                                    handleTimeChange(
                                      "minute",
                                      minute.toString()
                                    )
                                  }
                                >
                                  {minute.toString().padStart(2, "0")}
                                </Button>
                              )
                            )}
                          </div>
                          <ScrollBar
                            orientation="horizontal"
                            className="sm:hidden"
                          />
                        </ScrollArea>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Please select your preferred date and time.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <HoverCard>
            <HoverCardTrigger>
              <div>
                <Label className="text-white font-light text-[12px]">
                  How many other participants are attending?
                </Label>
                <Input
                  type="number"
                  className="rounded-lg h-10 bg-transparent border-[#595B5C] text-white"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                ></Input>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-[12px] text-[red]">Max participant is 10</p>
            </HoverCardContent>
          </HoverCard>
        </form>
      </Form>
      <Button onClick={handleSubmitBooking} className="">
        {loading ? (
          <>
            <SpinnerIcon strokeColor="white"></SpinnerIcon>
          </>
        ) : (
          <></>
        )}
        Book Now
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle className="font-semibold">
            Booked Event Successfully
          </DialogTitle>
          <p className="text-[14px]">
            You have successfully requested an event on {date}.
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogOpenFalse} onOpenChange={setDialogOpenFalse}>
        <DialogContent>
          <DialogTitle className="font-semibold">Booking Denied</DialogTitle>
          <p className="text-[14px]">
            Dates before today are not allowed. Please pick a future date.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
