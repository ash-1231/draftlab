"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type PricingDialogProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const PricingDialog: React.FC<PricingDialogProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="border rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold">Free</h2>
            <p className="text-3xl font-bold mt-2">Free</p>
          </div>

          <div className="border-2 border-blue-500 rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold">Professional</h2>
            <p className="text-3xl font-bold mt-2">$4.99</p>

            <Button className="mt-4 w-full bg-blue-600">
              Upgrade
            </Button>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  )
}

export default PricingDialog
