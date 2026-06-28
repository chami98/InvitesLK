"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import type { SeatingTable, RSVPRow, GuestSeating } from "@/lib/supabase";

type DraggedGuest = {
  rsvpId: string;
  name: string;
};

export function SeatingChart({
  coupleSlug,
  rsvpResponses,
}: {
  coupleSlug: string;
  rsvpResponses: RSVPRow[];
}) {
  const [tables, setTables] = useState<SeatingTable[]>([]);
  const [seating, setSeating] = useState<GuestSeating[]>([]);
  const [draggedGuest, setDraggedGuest] = useState<DraggedGuest | null>(null);
  const [newTableCapacity, setNewTableCapacity] = useState("8");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch seating data
  useEffect(() => {
    const fetchSeating = async () => {
      try {
        const [tablesRes, seatingRes] = await Promise.all([
          fetch(`/api/seating/tables?coupleSlug=${coupleSlug}`),
          fetch(`/api/seating/assign?coupleSlug=${coupleSlug}`),
        ]);

        if (!tablesRes.ok || !seatingRes.ok) throw new Error("Failed to fetch seating data");

        const { tables: tablesData } = await tablesRes.json();
        const { seating: seatingData } = await seatingRes.json();

        setTables(tablesData || []);
        setSeating(seatingData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load seating data");
      } finally {
        setLoading(false);
      }
    };

    fetchSeating();
  }, [coupleSlug]);

  // Add new table
  const addTable = async () => {
    try {
      const res = await fetch("/api/seating/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupleSlug,
          tableNumber: Math.max(...tables.map((t) => t.table_number), 0) + 1,
          capacity: Number(newTableCapacity),
        }),
      });

      if (!res.ok) throw new Error("Failed to create table");

      const { table } = await res.json();
      setTables([...tables, table]);
      setNewTableCapacity("8");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create table");
    }
  };

  // Delete table
  const deleteTable = async (tableId: string) => {
    try {
      const res = await fetch(`/api/seating/tables?tableId=${tableId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete table");

      setTables(tables.filter((t) => t.id !== tableId));
      setSeating(seating.filter((s) => s.seating_table_id !== tableId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete table");
    }
  };

  // Assign guest to table
  const assignGuestToTable = async (rsvpId: string, tableId: string) => {
    try {
      const guest = attendingGuests.find((g) => g.id === rsvpId);
      if (!guest) return;

      const res = await fetch("/api/seating/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupleSlug, rsvpId, tableId }),
      });

      if (!res.ok) throw new Error("Failed to assign guest");

      const newSeating: GuestSeating = {
        id: Math.random().toString(),
        rsvp_id: rsvpId,
        seating_table_id: tableId,
        guest_name: guest.guest_name,
        couple_slug: coupleSlug,
        created_at: new Date().toISOString(),
      };

      setSeating([...seating.filter((s) => s.rsvp_id !== rsvpId), newSeating]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to assign guest");
    }
  };

  // Remove guest from table
  const removeGuestFromTable = async (rsvpId: string) => {
    try {
      const res = await fetch("/api/seating/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coupleSlug, rsvpId, tableId: null }),
      });

      if (!res.ok) throw new Error("Failed to unassign guest");

      setSeating(seating.filter((s) => s.rsvp_id !== rsvpId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unassign guest");
    }
  };

  // Export seating chart
  const exportToCSV = () => {
    const rows = tables.map((table) => {
      const guestList = seating
        .filter((s) => s.seating_table_id === table.id)
        .map((s) => s.guest_name)
        .join(", ");

      return [
        `Table ${table.table_number}`,
        table.capacity,
        guestList.length > 0 ? guestList : "(empty)",
      ];
    });

    const csv = [
      ["Table", "Capacity", "Guests"],
      ...rows,
    ]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seating-${coupleSlug}-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const attendingGuests = rsvpResponses.filter(
    (r) => r.attendance === "attending" || r.attendance === "maybe"
  );

  const assignedGuestIds = new Set(seating.map((s) => s.rsvp_id));
  const unassignedGuests = attendingGuests.filter((g) => !assignedGuestIds.has(g.id));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-stone-400">Loading seating data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-stone-500">Table Capacity</label>
            <input
              type="number"
              min="1"
              max="20"
              value={newTableCapacity}
              onChange={(e) => setNewTableCapacity(e.target.value)}
              className="mt-1 rounded-lg border border-stone-200 px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={addTable}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Table
          </button>
          <button
            onClick={exportToCSV}
            disabled={tables.length === 0}
            className="flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Seating layout */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.length === 0 ? (
          <div className="col-span-full rounded-xl border border-stone-200 bg-white px-6 py-12 text-center text-sm text-stone-400">
            No tables yet. Create tables to start seating guests.
          </div>
        ) : (
          tables.map((table) => {
            const tableGuests = seating.filter((s) => s.seating_table_id === table.id);
            return (
              <TableCard
                key={table.id}
                table={table}
                guests={tableGuests}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (draggedGuest) {
                    assignGuestToTable(draggedGuest.rsvpId, table.id);
                    setDraggedGuest(null);
                  }
                }}
                onRemoveGuest={removeGuestFromTable}
                onDeleteTable={deleteTable}
              />
            );
          })
        )}
      </div>

      {/* Unassigned guests */}
      <div className="rounded-xl border border-stone-200 bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-stone-900">
          Unassigned Guests ({unassignedGuests.length})
        </h3>
        {unassignedGuests.length === 0 ? (
          <p className="text-sm text-stone-400">All guests are assigned!</p>
        ) : (
          <div className="space-y-2">
            {unassignedGuests.map((guest) => (
              <div
                key={guest.id}
                draggable
                onDragStart={() =>
                  setDraggedGuest({ rsvpId: guest.id, name: guest.guest_name })
                }
                onDragEnd={() => setDraggedGuest(null)}
                className="cursor-move rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 hover:bg-stone-100"
              >
                {guest.guest_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TableCard({
  table,
  guests,
  onDragOver,
  onDrop,
  onRemoveGuest,
  onDeleteTable,
}: {
  table: SeatingTable;
  guests: GuestSeating[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onRemoveGuest: (rsvpId: string) => void;
  onDeleteTable: (tableId: string) => void;
}) {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="rounded-xl border-2 border-dashed border-stone-200 bg-white p-4 hover:border-blue-300 hover:bg-blue-50"
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-stone-900">Table {table.table_number}</h4>
          <p className="text-xs text-stone-500">
            {guests.length} / {table.capacity} guests
          </p>
        </div>
        <button
          onClick={() => onDeleteTable(table.id)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-2">
        {guests.length === 0 ? (
          <p className="py-4 text-center text-sm text-stone-400">Drag guests here</p>
        ) : (
          guests.map((guest) => (
            <div
              key={guest.id}
              className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-2 text-sm"
            >
              <span className="text-stone-700">{guest.guest_name}</span>
              <button
                onClick={() => onRemoveGuest(guest.rsvp_id)}
                className="text-stone-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
