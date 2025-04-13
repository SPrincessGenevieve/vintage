import { toast } from "react-toastify";

export default function CustomToast(title: string, description: string) {
  toast.success(
    <div>
      <h1 className="font-semibold">{title}</h1>
      <span className="text-muted-foreground text-sm">{description}</span>
    </div>
  );
}
