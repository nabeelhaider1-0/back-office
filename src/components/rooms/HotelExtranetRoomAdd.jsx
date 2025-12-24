import React, { useMemo, useState } from "react";
import { createRoom, getRoom, updateRoom } from "../../Apis/hotelExtranetApi";
import Header2 from "../header2/header2";
import Constants from "../../constants/routes";
import { toast } from "react-toastify";
import HotelExtranetRoomForm from "./HotelExtranetRoomForm";
import HotelProfileWizardProgress from "../hotelWizard/HotelProfileWizardProgress";
import {
  ensureWizardActive,
  getNextWizardStep,
  getWizardStepRef,
  markStepComplete,
  resetWizardState,
  setWizardEditStep,
  setWizardStepRef,
  updateWizardState,
  wouldCompleteAllBlockers,
} from "../hotelWizard/hotelProfileWizardUtils";
import useWizardMode from "../hotelWizard/useWizardMode";
import WizardModeChrome from "../hotelWizard/WizardModeChrome";
import useWizardBackNavigation from "../hotelWizard/useWizardBackNavigation";

const normalizeRoomResponse = (api = {}) => ({
  id: api.id || api.roomId || api.room_id || null,
  hotelId: api.hotelId || api.hotel_id || null,
  code: api.code || "",
  name: api.name || "",
  max_adults: api.maxAdults ?? api.max_adults ?? 0,
  max_children: api.maxChildren ?? api.max_children ?? 0,
  area_sqm: api.areaSqm ?? api.area_sqm ?? "",
  bedding: api.bedding || [],
  amenities: api.amenities || [],
  images: api.images || [],
  occupancy: api.occupancy || null,
  status: api.status || "active",
});

const buildRoomPayload = (data = {}) => {
  const sanitized = {
    name: data.name,
    max_adults: Number.isFinite(Number(data.max_adults)) ? Number(data.max_adults) : 0,
    max_children: Number.isFinite(Number(data.max_children)) ? Number(data.max_children) : 0,
    amenities: Array.isArray(data.amenities) ? data.amenities : [],
    area_sqm: (() => {
      const n = parseInt(data.area_sqm, 10);
      return Number.isFinite(n) && n >= 0 ? n : 0;
    })(),
    occupancy:
      data.occupancy && typeof data.occupancy === "object"
        ? {
            adults: Number.isFinite(Number(data.occupancy.adults)) ? Number(data.occupancy.adults) : 0,
            children: Number.isFinite(Number(data.occupancy.children)) ? Number(data.occupancy.children) : 0,
            max_guest: Number.isFinite(Number(data.occupancy.max_guest)) ? Number(data.occupancy.max_guest) : 0,
          }
        : undefined,
    bedding: Array.isArray(data.bedding) ? data.bedding : undefined,
    images: Array.isArray(data.images)
      ? data.images.map((img) => ({
          url: img?.url || "",
          label: img?.label || "",
        }))
      : undefined,
  };
  return sanitized;
};

const extractRoomId = (res) =>
  res?.data?.id ||
  res?.data?.roomId ||
  res?.data?.room_id ||
  res?.data?.data?.id ||
  res?.data?.data?.roomId ||
  res?.data?.data?.room_id ||
  null;

export default function HotelExtranetRoomAdd({ setShowHeaderAndMenuBar }) {
  const {
    isWizardMode,
    toggleMode,
    searchParams,
    location,
    navigate,
  } = useWizardMode();
  const wizardHotelId = searchParams.get("hotelId") || "";
  const [submitting, setSubmitting] = useState(false);
  const [formResetKey, setFormResetKey] = useState(0);
  const [formMode, setFormMode] = useState("create");
  const [initialValue, setInitialValue] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [editingRef, setEditingRef] = useState(null);
  const baseDefaults = useMemo(
    () => (isWizardMode && wizardHotelId ? { hotelId: wizardHotelId } : null),
    [isWizardMode, wizardHotelId],
  );
  const { canGoBack, handleBack } = useWizardBackNavigation("rooms", { location, navigate });
  const loadRoomDetails = async (roomId, { showLoader = true } = {}) => {
    if (!roomId) return null;
    if (showLoader) setLoadingInitial(true);
    try {
      const res = await getRoom(roomId);
      if (res?.status === 200) {
        const normalized = normalizeRoomResponse(res.data);
        setInitialValue(normalized);
        return normalized;
      }
      toast.error(res?.data?.message || "Failed to load room details");
      return null;
    } catch (error) {
      toast.error("Failed to load room details");
      return null;
    } finally {
      if (showLoader) setLoadingInitial(false);
    }
  };
  React.useEffect(() => { setShowHeaderAndMenuBar && setShowHeaderAndMenuBar(true); }, [setShowHeaderAndMenuBar]);
  React.useEffect(() => {
    if (!isWizardMode) return;
    const state = ensureWizardActive();
    const updates = {};
    if (state.currentStep !== "rooms") {
      updates.currentStep = "rooms";
    }
    if (wizardHotelId && state.entities?.hotelId !== wizardHotelId) {
      updates.entities = { ...state.entities, hotelId: wizardHotelId };
    }
    if (Object.keys(updates).length) {
      updateWizardState(updates);
    }
  }, [isWizardMode, wizardHotelId, location.search]);
  React.useEffect(() => {
    if (!isWizardMode) {
      setFormMode("create");
      setInitialValue(null);
      setEditingRef(null);
      setLoadingInitial(false);
      return;
    }
    const state = ensureWizardActive();
    const ref = state.entities?.stepRefs?.rooms || getWizardStepRef("rooms");
    if (state.entities?.editStep === "rooms") {
      if (ref?.id) {
        setFormMode("edit");
        setEditingRef(ref);
        if (ref.data) {
          setInitialValue(ref.data);
        } else {
          loadRoomDetails(ref.id);
        }
      } else {
        toast.error("No previously saved room found to edit");
        setFormMode("create");
        setInitialValue(null);
        setEditingRef(null);
      }
      setWizardEditStep(null);
      return;
    }
    if (!initialValue && ref?.id) {
      setFormMode("edit");
      setEditingRef(ref);
      if (ref.data) {
        setInitialValue(ref.data);
      } else {
        loadRoomDetails(ref.id, { showLoader: false });
      }
    }
  }, [isWizardMode, location.search, initialValue]);

  const submitCreate = async (data, intent) => {
    const targetHotelId = data.hotelId || wizardHotelId;
    if (!targetHotelId) {
      toast.error("Hotel is required");
      return;
    }
    const sanitizedPayload = buildRoomPayload(data);
    try {
      const res = await createRoom(targetHotelId, sanitizedPayload);
      if (res?.status === 201 || res?.status === 200) {
        toast.success("Room created successfully");
        if (isWizardMode) {
          const state = ensureWizardActive();
          const nextStep = getNextWizardStep("rooms");
          const roomId = extractRoomId(res);
          const responseData = res?.data?.data || res?.data || {};
          const normalizedResponse = responseData ? normalizeRoomResponse(responseData) : null;
          const entities = {
            ...state.entities,
            hotelId: wizardHotelId || targetHotelId,
            stepRefs: {
              ...(state.entities?.stepRefs || {}),
              rooms: {
                ...(state.entities?.stepRefs?.rooms || {}),
                id: roomId || state.entities?.stepRefs?.rooms?.id || null,
                hotelId: wizardHotelId || targetHotelId,
                data: {
                  ...(state.entities?.stepRefs?.rooms?.data || {}),
                  ...(normalizedResponse || sanitizedPayload),
                  hotelId: targetHotelId,
                  id: roomId || state.entities?.stepRefs?.rooms?.id || null,
                },
              },
            },
          };
          const wizardUpdates = { entities };
          if (intent === "save-next" && nextStep) {
            wizardUpdates.currentStep = nextStep.id;
          }
          const allBlockersCleared = wouldCompleteAllBlockers("rooms");
          markStepComplete("rooms", wizardUpdates);
          if (intent === "save-next") {
            if (allBlockersCleared) {
              resetWizardState();
              setFormResetKey((key) => key + 1);
              navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
              return;
            }
            if (nextStep) {
              const params = new URLSearchParams();
              params.set("wizard", "1");
              if (entities.hotelId) params.set("hotelId", entities.hotelId);
              if (state.entities?.returnToReadiness) {
                params.set("fixMode", "1");
              }
              setFormResetKey((key) => key + 1);
              navigate(`${nextStep.route}?${params.toString()}`);
              return;
            }
          }
        }
        if (!isWizardMode && intent === "save") {
          window.location.href = Constants.URLConstants.HOTELSEXTRANETROOMSLIST;
          return;
        }
        setFormResetKey((key) => key + 1);
      } else {
        const msg = Array.isArray(res?.data?.message)
          ? res.data.message.join("\n")
          : res?.data?.message || "Failed to create room";
        toast.error(msg);
      }
    } catch (e) {
      const msg = Array.isArray(e?.response?.data?.message)
        ? e.response.data.message.join("\n")
        : e?.response?.data?.message || "Failed to create room";
      toast.error(msg);
    }
  };

  const submitUpdate = async (data, intent) => {
    if (!editingRef?.id) {
      toast.error("Unable to determine which room to update");
      return;
    }
    const sanitizedPayload = buildRoomPayload(data);
    try {
      const res = await updateRoom(editingRef.id, sanitizedPayload);
      if (res?.status === 200) {
        toast.success("Room updated successfully");
        if (isWizardMode) {
          const state = ensureWizardActive();
          const nextStep = getNextWizardStep("rooms");
          const hotelContext =
            wizardHotelId ||
            editingRef.hotelId ||
            data.hotelId ||
            state.entities?.hotelId ||
            "";
          const responseData = res?.data?.data || res?.data || {};
          const normalizedResponse = responseData ? normalizeRoomResponse(responseData) : null;
          const entities = {
            ...state.entities,
            hotelId: hotelContext,
            stepRefs: {
              ...(state.entities?.stepRefs || {}),
              rooms: {
                ...(state.entities?.stepRefs?.rooms || {}),
                id: editingRef.id,
                hotelId: hotelContext,
                data: {
                  ...(state.entities?.stepRefs?.rooms?.data || {}),
                  ...(normalizedResponse || sanitizedPayload || {}),
                  hotelId: hotelContext,
                  id: editingRef.id,
                },
              },
            },
          };
          const wizardUpdates = { entities };
          if (intent === "save-next" && nextStep) {
            wizardUpdates.currentStep = nextStep.id;
          }
          const allBlockersCleared = wouldCompleteAllBlockers("rooms");
          markStepComplete("rooms", wizardUpdates);
          if (intent === "save-next") {
            if (allBlockersCleared) {
              resetWizardState();
              navigate(Constants.URLConstants.HOTELSEXTRANETREADINESSLIST);
              return;
            }
            if (nextStep) {
              const params = new URLSearchParams();
              params.set("wizard", "1");
              if (entities.hotelId) params.set("hotelId", entities.hotelId);
              if (state.entities?.returnToReadiness) {
                params.set("fixMode", "1");
              }
              navigate(`${nextStep.route}?${params.toString()}`);
              return;
            }
          } else {
            await loadRoomDetails(editingRef.id, { showLoader: false });
          }
        } else {
          window.location.href = Constants.URLConstants.HOTELSEXTRANETROOMSLIST;
        }
      } else {
        const msg = Array.isArray(res?.data?.message)
          ? res.data.message.join("\n")
          : res?.data?.message || "Failed to update room";
        toast.error(msg);
      }
    } catch (e) {
      const msg = Array.isArray(e?.response?.data?.message)
        ? e.response.data.message.join("\n")
        : e?.response?.data?.message || "Failed to update room";
      toast.error(msg);
    }
  };

  const handleSubmit = async (data, intent = "save") => {
    setSubmitting(true);
    try {
      if (formMode === "edit" && editingRef?.id) {
        await submitUpdate(data, intent);
      } else {
        await submitCreate(data, intent);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header2 title="ADD ROOM" linkText1="Rooms" linkText2="Add Room" link1={Constants.URLConstants.HOTELSEXTRANETROOMSLIST} />
      <div className="container-fluid pt-0 p-4" id="content-pad">
        <WizardModeChrome
          isWizardMode={isWizardMode}
          onToggle={toggleMode}
          progress={<HotelProfileWizardProgress />}
          canGoBack={canGoBack}
          onBack={handleBack}
          guideStepId="rooms"
        >
          {loadingInitial ? (
            <div className="p-3 text-muted">Loading saved room…</div>
          ) : (
            <HotelExtranetRoomForm
              key={formResetKey}
              mode={formMode}
              initialValue={initialValue}
              onSubmit={handleSubmit}
              submitting={submitting}
              wizardConfig={isWizardMode ? { isActive: true } : null}
              baseDefaults={baseDefaults}
            />
          )}
        </WizardModeChrome>
      </div>
    </>
  );
}
